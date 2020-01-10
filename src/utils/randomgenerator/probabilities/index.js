import {
  orderBy,
  find,
  map,
  uniq
} from 'lodash'

import { Decimal } from 'decimal.js'

import { setEntityClosestPosition } from './utils'

import {
  integer, 
  real, 
  MersenneTwister19937
} from 'random-js'


const VELOCITY = 6
const LIMIT = 1
const MAX_SCENES_AMOUNT = 10
const NON_ZERO_POS_ADDEND = 1
const NON_ZERO_PROB_ADDEND = 1
const FORMULA_FACTOR = 2
const FORMULA_ADDEND = 0.5


/**
 * Sets a probability to each sequence
 * @param {Number} position 
 * @param {Array} availableSequences 
 */
export const calculateSequencesProbability = (position, availableSequences) => {
  let sequencesWithPosAndDist = setEntityClosestPosition(position, availableSequences)
  const positionsWithProbability = getPositionsProbability(sequencesWithPosAndDist)

  logPositionProbabilities(position, positionsWithProbability)
  return setSequenceProbability(positionsWithProbability, sequencesWithPosAndDist)
}

/**
 * SETS PROBABILITY TO POSITIONS
 * @param {*} sequences 
 */
const getPositionsProbability = (sequences) => {
  let positionSequences = sequencesPerPosition(sequences)
  positionSequences = positionSequences.map(addFactorToPosition)

  return setPositionProbability(positionSequences)
}

/**
 * JOINS SEQUENCES BASED ON CLOSEST DISTANCE TO NEXT POSITION
 * @param {*} sequences 
 */
const sequencesPerPosition = (sequences) => {
  const distances = sequences.reduce((acc, seq) => {
    let pos = find(acc, { distance: seq.positionDistance })
    if (!pos) {
      pos = {
        distance: seq.positionDistance,
        sequences: []
      }
      acc.push(pos)
    }
    pos.sequences.push(seq)
    
    return acc
  }, [])
  return orderBy(distances, 'distance')
}

/**
 * SETS FACTOR BASED ON DISTANCE AND AMOUNT OF SEQUENCES PER POSITION
 * @param {*} positions
 */
const addFactorToPosition = (position) => {
  const positionTotScenes = Math.min(position.sequences.length, MAX_SCENES_AMOUNT)
  const factor = positionTotScenes / (NON_ZERO_POS_ADDEND + position.distance)
  return {
    ...position,
    totalSequences: positionTotScenes,
    probabilityFactor: factor
  }
}

/**
 * Sets the proability to each position with Logistic function
 * @param {*} positions 
 */
const setPositionProbability = (positions) => {
  const totalAvailableScenes = sumFactors(positions)
  let lastPercentage = new Decimal(0)

  return positions.map((position, index) => {
    let totalScenesUntilMe = sumFactors(positions.slice(0, index + 1))

    let positionSumPercentage = new Decimal(FORMULA_FACTOR * (LIMIT / (NON_ZERO_PROB_ADDEND + Math.exp(-VELOCITY * (totalScenesUntilMe / totalAvailableScenes))) - FORMULA_ADDEND))

    const currentPercentage = lastPercentage
    lastPercentage = positionSumPercentage

    return {
      ...position,
      percentage: positionSumPercentage.minus(currentPercentage)
    }
  })
}

/**
 * Sets the probability to each sequence based on their distances
 * @param {*} positions 
 * @param {*} sequences 
 */
const setSequenceProbability = (positions, sequences) => {
  return sequences.map(sequence => {

    const seqPosition = find(positions, pos => {
      return pos.sequences.includes(sequence)
    })

    let probability
    if (seqPosition) {
      probability = seqPosition.percentage.dividedBy(seqPosition.sequences.length)
    } else {
      probability = 0
    }

    return {
      ...sequence,
      probability 
    }
  })
}

const sumFactors = (elements) => {
  return map(elements, 'probabilityFactor').reduce((acc, value) => acc + value)
}

/**
 * chooses a sequence based on probability
 * @param {Array} sequences: available sequences
 */
export const getRandomSequenceBasedonProbability = (sequences) => {
  if (sequences.length === 1) {
    return sequences[0]
  }
  let [sequencesWithRange, limit] = setRangesForSequences(sequences)
  sequencesWithRange = orderBy(sequencesWithRange, 'probability', 'desc')
  
  let selectedSequence
  let attempts = 0
  const MAX_ATTEMPTS = 100
  do {
    attempts++
    let engine = MersenneTwister19937.autoSeed()
    let distribution = real(0, limit)
    const seed = new Decimal(distribution(engine))
    selectedSequence = sequencesWithRange.find(s => s.range.low.lessThanOrEqualTo(seed) && s.range.high.greaterThanOrEqualTo(seed))
  } while (!selectedSequence && attempts < MAX_ATTEMPTS)

  if (!selectedSequence) {
    throw new Error('unable to select sequence')
  }
  return selectedSequence
}


/**
 * adds ranges to the sequences
 * @param {*} sequences 
 */
const setRangesForSequences = (sequences) => {
  let engine = MersenneTwister19937.autoSeed()
  let distribution = integer(0, 1)
  
  let randomSequences = sequences.sort(s => {
    const seed = distribution(engine)
    return seed === 0 ? 1 : -1 
  })

  let limit = new Decimal(0)

  randomSequences = randomSequences.map(s => {
    let range = {
      low: limit,
      high: limit.plus(s.probability)
    }
    limit = range.high
    return {
      ...s,
      range
    }
  })

  return [randomSequences, limit]
}

const logPositionProbabilities = (index, positions) => {

  const percentageByPosition = positions.map(pos => {
    const sequences = pos.sequences.map(seq => {
      return {
        sceneNumber: seq.sceneNumber,
        closestPosition: seq.closestPosition
      }
    })
    const positions = uniq(map(sequences, 'closestPosition'))
    const percentage = pos.percentage.times(100)

    return {
      distance: pos.distance,
      positions,
      percentage: percentage.toString(),
      sequences: sequences.map(seq => [seq.closestPosition, seq.sceneNumber])
    }
  })

  console.log(`percentage per positions `, percentageByPosition)
}

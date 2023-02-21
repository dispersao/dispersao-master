export const reorderScriptsequences = (source, destination) => {
  const moveForward = source > destination
  const movedScriptSequence = orderedScriptsequences[source]
  const iniSlice = moveForward ? destination : source + 1
  const endSlice = moveForward ? source : destination + 1
  let reordered = orderedScriptsequences.slice(iniSlice, endSlice)
  const step = moveForward ? 1 : -1
  reordered = reordered.map((id) => ({
    id,
    index: orderedScriptsequences.indexOf(id) + step
  }))
  reordered.push({
    id: movedScriptSequence,
    index: destination
  })

  reordered = (reordered.length && reordered) || null

  createUpdateDelete(null, reordered)

  console.log(
    'after reordering script sequences',
    iniSlice,
    endSlice,
    reordered
  )
}

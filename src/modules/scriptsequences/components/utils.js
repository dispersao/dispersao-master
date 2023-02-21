export const reorderScriptsequences = ({source, destination, list}) => {
  const moveForward = source > destination
  const movedScriptSequence = list[source]
  const iniSlice = moveForward ? destination : source + 1
  const endSlice = moveForward ? source : destination + 1
  let reordered = list.slice(iniSlice, endSlice)
  const step = moveForward ? 1 : -1
  reordered = reordered.map((id) => ({
    id,
    index: list.indexOf(id) + step
  }))
  reordered.push({
    id: movedScriptSequence,
    index: destination
  })

  reordered = (reordered.length && reordered) || null

  console.log(
    'after reordering script sequences',
    iniSlice,
    endSlice,
    reordered
  )

  return reordered
}

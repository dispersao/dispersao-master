export const sortEntity = (a, b) => {
  return a.get('id') < b.get('id') ? -1 : (a.get('id') > b.get('id') ? 1 : 0)
}

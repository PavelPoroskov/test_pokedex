
export const capitalizeStr = (s) =>
  s && s[0].toUpperCase() + s.slice(1)

export const range = (beg, end) => {
  let arr = []
  let cur = beg
  while (cur <= end) {
    arr.push(cur)
    cur++
  }
  return arr
}

const findIndexElement = (array, item) => {
  let count = -1
  array.forEach((element, i) => {
    if (Object.values(element).join('').includes(item)) {
      count = i
    }
  })
  return count
}

export default findIndexElement

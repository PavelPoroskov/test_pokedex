// return promize or array of promeses
export function requestResExt ({resource, id, offset, limit}) {
  let arrProm = []
  if (!resource) {
    return arrProm
  }

  // if (!id || (!offset && !limit)) {
  if (!(id || limit)) {
    return arrProm
  }

  // const urlRes = `${urlApi}${resource}/`
  const urlRes = `${resource}/`

  if (id) {
    let schema = schemas[resource]
    let ids = id
    if (!(id instanceof Array)) {
      // ids = [id]
      return apiCached(`${urlRes}${id}/`, schema)
    }

    ids.forEach(id => {
      arrProm.push(apiCached(`${urlRes}${id}/`, schema))
    })
  } else {
    // const cachePageSize = 20

    const reqestBeg = (offset || 0) + 1
    const reqestEnd = reqestBeg + limit - 1

    // console.log(' reqestBeg ' + reqestBeg + ' ')
    // console.log(' reqestEnd ' + reqestEnd + ' ')

    const pageInd1Beg = (reqestBeg % cachePageSize) || cachePageSize
    const pagedBeg = reqestBeg - pageInd1Beg + 1

    const pageInd1End = (reqestEnd % cachePageSize) || cachePageSize
    const pagedEnd = reqestEnd - pageInd1End + cachePageSize

    let schema = schemas[`${resource}List`]

    if (reqestBeg === pagedBeg && reqestEnd === pagedEnd) {
      if (limit === cachePageSize) {
        const curOffset = pagedBeg - 1
        const url = `${urlRes}?offset=${curOffset}&limit=${cachePageSize}`
        return apiCached(url, schema)
      }

      let curPageBeg = pagedBeg
      let curOffset, url
      while (curPageBeg < pagedEnd) {
        curOffset = curPageBeg - 1
        url = `${urlRes}?offset=${curOffset}&limit=${cachePageSize}`
        arrProm.push(apiCached(url, schema))

        curPageBeg = curPageBeg + cachePageSize
      }
      return arrProm
    }

    const fnSlice = (beg0, end0) => (resultNorm) => {
      const {result, ...restNorm} = resultNorm
      const {results, ...restResult} = result
      const newResult = {
        results: results.slice(beg0, end0 + 1),
        ...restResult
      }

      return {
        result: newResult,
        ...restNorm
      }
    }

    let curPageBeg = pagedBeg
    let curOffset, url
    while (curPageBeg < pagedEnd) {
      // console.log(' beg ' + curPageBeg + ' ')
      curOffset = curPageBeg - 1
      url = `${urlRes}?offset=${curOffset}&limit=${cachePageSize}`
      // let promiseRes = apiCached(url, schema).then(result => fnSlice(result, curPageBeg))

      const curPageEnd = curPageBeg + cachePageSize - 1
      let todoSlice = false
      let beg0 = 0
      if (curPageBeg <= reqestBeg && reqestBeg <= curPageEnd) {
        beg0 = reqestBeg - curPageBeg
        todoSlice = true
      }
      let end0 = cachePageSize - 1
      if (curPageBeg <= reqestEnd && reqestEnd <= curPageEnd) {
        end0 = reqestEnd - curPageBeg
        todoSlice = true
      }

      let promiseRes
      if (todoSlice) {
        promiseRes = apiCached(url, schema).then(fnSlice(beg0, end0))
      } else {
        promiseRes = apiCached(url, schema)
      }

      arrProm.push(promiseRes)

      curPageBeg = curPageBeg + cachePageSize
    }
  }

  return arrProm
}


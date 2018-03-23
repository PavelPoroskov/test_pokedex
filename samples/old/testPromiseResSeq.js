function runPromiseInSequense (arr) {
  return arr.reduce((promiseChain, currentPromise) => {
    return promiseChain.then((chainedResult) => {
      return currentPromise.then((res) => {
        console.log('=> output' + res)
        return res
      })
    })
  }, Promise.resolve())
}

// // promise function 1
// function p1 () {
//   return new Promise((resolve, reject) => {
//     resolve(5)
//   })
// }

// // promise function 2
// function p2 (a) {
//   return new Promise((resolve, reject) => {
//     resolve(a * 2)
//   })
// }

// // promise function 3
// function p3 (a) {
//   return new Promise((resolve, reject) => {
//     resolve(a * 3)
//   })
// }

function resolveAfterSeconds (x) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('<= recieved ' + x)
      resolve(x)
    }, x * 1000)
  })
}

const promiseArr = [
  resolveAfterSeconds(5),
  resolveAfterSeconds(10),
  resolveAfterSeconds(15),
  resolveAfterSeconds(13),
  resolveAfterSeconds(12),
  resolveAfterSeconds(11)
]

// runPromiseInSequense(promiseArr)
//   .then((res) => {
//     console.log(res)
//   })

// ++
// promiseArr.reduce((promiseChain, currentPromise) => {
//   return promiseChain.then(() => {
//     return currentPromise.then((res) => {
//       console.log('=> output ' + res)
//       return res
//     })
//   })
// }, Promise.resolve())

// promiseArr.reduce((accProm, curProm) => {
//   return accProm.then(() => {
//     return curProm.then((res) => {
//       console.log('=> output ' + res)
//       return res
//     })
//   })
// }, Promise.resolve())

promiseArr.reduce((accProm, curProm) =>
  accProm.then(() =>
    curProm.then((res) => {
      console.log('=> output ' + res)
      return res
    })
  ), Promise.resolve())

// arPromises.reduce((prevProm, curProm) =>
//   prevProm.then(() =>
//     curProm.then((result) => {
//       //
//       console.log('to dispatch: ' + result.result)
//       put(actSetEntities({
//         entities: result.entities
//       }))
//       put(actFetchPageBatchSucces({
//         result: [result.result]
//       }))
//     })
//   )
//   , Promise.resolve())

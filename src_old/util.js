exports.urlDiff = (_oldURL, _newURL) => {
  const oldURL = new URL(_oldURL)
  const newURL = new URL(_newURL)
  console.log(oldURL)
  console.log(newURL)
}

export function delayed(f, time = 0){
  return new Promise((resolve, reject) => {
    setTimeout(async function () {
      try{
        resolve(await f())
      }catch(e){
        reject(e)
      }
    }, time)
  })
}

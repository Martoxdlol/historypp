function createPromise(){
  let resolver
  return {
    promise: new Promise((resolve, reject) => {
      resolver = resolve
    }),
    resolver
  }
}

export default function(history){
  let { promise:waitEventPromise, resolver:waitEventPromiseResovler } = createPromise()

  window.addEventListener('popstate', async event => {
    //User triggered event
    const newPos = history.originalHistory.state && history.originalHistory.state.pos
    if(!history.ignoreEvent && newPos != 1){
      //Push state / navigate event / hash change
      if(!history.originalHistory.state){
        history.originalHistory.back()

        console.log("NAVIGATE")
      }else
      //Forward event
      if(history.originalHistory.state.pos == 2){
        history.originalHistory.back()

        console.log("FORWARD")
      }else
      //Backward event
      if(history.originalHistory.state.pos == 0){
        //history.originalHistory.pushState ( back state )
        history.originalHistory.pushState({pos:1},'')
        await history.enableForwardButton()

        console.log("BACKWARD")
      }
    }

    waitEventPromiseResovler(event)
    const { promise, resolver } = createPromise()
    waitEventPromise = promise
    waitEventPromiseResovler = resolver
  })

  return function waitEventTrigger(){
    return waitEventPromise
  }
}

const events = {}

function addEventListener(name, callback){
  events[name] = [...(events[name] || []), callback]
  return () => {
    removeEventListener(name,callback)
  }
}

function removeEventListener(name, callback){
  if(Array.isArray(events[name])){
    let i = 0
    while(i < events[name].length){
      if(events[name][i] == callback){
        events[name].splice(i,1)
      }else{
        i++
      }
    }
  }
}

function launchEvent(name, data){
  if(Array.isArray(events[name])){
    for(const c of events[name]){
      try {
        c(data)
      } catch (e) {
        console.error(e)
      }
    }
  }
}

exports.on = addEventListener
exports.addEventListener = addEventListener
exports.removeEventListener = removeEventListener
exports.launchEvent = launchEvent

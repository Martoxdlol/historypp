import { HistoryEvent } from './events'

class EventEmitter{
  constructor(){
    this.eventHandlers = {}
  }

  addEventListener(name, handler){
    if(!this.eventHandlers[name]) this.eventHandlers[name] = new Set()
    this.eventHandlers[name].add(handler)
  }

  removeEventListener(name, handler){
    if(!this.eventHandlers[name]) this.eventHandlers[name] = new Set()
    this.eventHandlers[name].delete(handler)
  }

  emit(name, ...args){
    if(!this.eventHandlers[name]) this.eventHandlers[name] = new Set()
    let stopPropagation
    let cancelled = false
    for(const cb of this.eventHandlers[name]){
      const event = args[0]
      event.setCancelled = set => {
        cancelled = !!set
      }
      event.cancel = () => {
        cancelled = true
        stopPropagation = true
      }
      event.stopPropagation = () => {
        stopPropagation = true
      }
      cb.apply(this, args)
      if(stopPropagation) break
    }
    return cancelled
  }

  launchEvent(name, data){
    // Get event values
    // new/actual position
    const position = data.position || this.position
    //Event type
    const type = data.type || name
    //Give event access to this instance
    const history = this
    //Action compatible with npm 'history' package
    const action = ''
    //create event
    const event = new HistoryEvent({...data, history, position})
    //Emit event
    return this.emit(name, event)
  }
}

export default function makeEmitter(instance){
  //this function adds events emitting capabilities to any object/instance
  const emitter = new EventEmitter()
  emitter.history = instance
  instance.eventEmitter = emitter
  instance.eventHandlers = emitter.eventHandlers
  instance.addEventListener = emitter.addEventListener
  instance.removeEventListener = emitter.removeEventListener
  instance.emit = emitter.emit
  instance.launchEvent = emitter.launchEvent
}

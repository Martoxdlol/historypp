import Action, { typeToAction } from './action'
import { HistoryEvent } from './events'

class EventEmitter{
  constructor(){
    this.eventHandlers = {}
  }

  on(name, handler){
    return this.addEventListener(name, handler)
  }

  addEventListener(name, handler){
    if(!this.eventHandlers[name]) this.eventHandlers[name] = new Set()
    this.eventHandlers[name].add(handler)
    return () => {
      this.removeEventListener(name, handler)
    }
  }

  removeEventListener(name, handler){
    if(!this.eventHandlers[name]) this.eventHandlers[name] = new Set()
    this.eventHandlers[name].delete(handler)
  }

  listen(handler){
    this.addEventListener('listen', handler)
    return () => {
      this.removeEventListener('listen', handler)
    }
  }

  emit(name, ...args){
    if(!this.eventHandlers[name]) this.eventHandlers[name] = new Set()
    if(!this.eventHandlers['listen']) this.eventHandlers['listen'] = new Set()
    let stopPropagation
    let cancelled = false
    const event = args[0]
    //listen event triggers on any event
    for(const cb of this.eventHandlers['listen']){
      cb(event)
    }
    for(const cb of this.eventHandlers[name]){
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
      event.__defineGetter__('cancelled', () => {
        return cancelled
      })
      cb.apply(this, args)
      if(stopPropagation) break
    }
    return cancelled
  }

  makeEvent(name, data){
    // Get event values
    // new/actual position
    const position = data.position || this.position
    //Event type
    const type = data.type || name
    //Give event access to this instance
    const history = this
    //Action compatible with npm 'history' package
    const action = Action[typeToAction(type)]
    //create event
    const event = new HistoryEvent({...data, history, position, type, action})
    return event
  }

  launchEvent(name, data){
    //Emit event
    return this.emit(name, makeEvent(name, data))
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
  instance.listen = emitter.listen
  instance.emit = emitter.emit
  instance.makeEvent = emitter.makeEvent
  instance.launchEvent = emitter.launchEvent
}

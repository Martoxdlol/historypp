import Route from './route'
import handleEvents from './handlers'
import makeEmitter from './emitter'

class HistoryPP{
  constructor(historyController){
    this.historyController = historyController
    this._list = []
    //this function could be done inside constructor but I prefer to extend it to a separate file
    //Is like an extension of constructor
    handleEvents.bind(this)(historyController)

    //add event emitter and add methods
    makeEmitter(this)

    this._push(location.href)
  }

  _getRoute(routeOrUrl, state){
    //it can receive a route object or url
    let route
    if(routeOrUrl instanceof Route){
      //if received a url object no problem
      route = routeOrUrl
      if(state != undefined){
        //if also received a state, the route state will be replaced
        route.state = state
      }
    }else{
      //if received a url create new route with that url and state (state can be undefined)
      route = new Route(routeOrUrl.toString(), state)
    }
    return route
  }

  _push(routeOrUrl, state, options){
    //Get route from input, (input can be url or route object)
    const route = this._getRoute(routeOrUrl, state, options)
    //Mount route, (give access of history to route. It's usefull for things like position)
    route.mount(this, this.url)
    //Push route to _list
    this._list.push(route)
    //Update position to the new route
    this.position = route.position
  }

  async push(routeOrUrl, state, options){
    //Save position for the event
    const lastPosition = this.position
    //push route
    this._push(routeOrUrl, state, options)
    // TODO: Launch event
    //...
    this.historyController.url = this.current.url
  }

  insert(pos, routeOrUrl, state, options){
    //Verify position
    HistoryPP._verifyPos(pos, this.length - 1)
    //Get route from input
    const route = this._getRoute(routeOrUrl, state, options)
    //JavaScript Array doesn't has a insert method
    //removed is an array with elements of _list from pos to end
    const removed = this._list.splice(pos)
    //Base url to generate route url is taken from previous element from pos if exist
    let baseUrl = this.url
    //Previos element is now the last element on _list
    if(this.last) baseUrl = this.last.url
    //Mount route
    route.mount(this, baseUrl)
    //Add route to cutted list
    this._list.push(route)
    //Append removed elements to recreate original list with inserted new route
    this._list.push(...removed)
    //save last position for the event
    const lastPosition = this.position
    // if inserted before actual route position should be updated to stay on the same route
    if(pos < this.position) this.position++
    // TODO: Launch event
    //...
  }

  replace(pos, routeOrUrl, state, options){
    //Verify position
    HistoryPP._verifyPos(pos, this.length - 1)
    //Get route from input
    const route = this._getRoute(routeOrUrl, state, options)
    //Save the route that will be replaced
    const replacedRoute = this._list[pos]
    //Use replaced route url as base url
    route.mount(this, replacedRoute.url)
    //Replace the route on _list
    this._list[pos] = route
    // TODO: Launch event
    //...
  }

  _pop(pos){
    //Verify position
    HistoryPP._verifyPos(pos, this.length - 1)
    //Check length
    if(this.length <= 1) throw new TypeError('History list cannot be empty')
    //Save removed route
    const removedRoute = this._list[pos]
    //Remove route from _list
    this._list.splice(pos, 1)
    //Return removed element
    return removedRoute
  }

  pop(pos){
    if(!pos) pos = this.last.position
    //Save position for the event
    const lastPosition = this.position
    //do the pop
    const removedRoute = this._pop(pos)
    // TODO: Launch event
    //...
    if(pos == this.position){
      this.position--
      // TODO: Launch change event
    }else if(pos < this.position){
      this.position--
    }
    this.historyController.url = this.url
    //Return removed element
    return removedRoute
  }

  static _verifyPos(pos, max){
    if(!Number.isInteger(pos)) throw new TypeError('Position isn\'t a integer')
    if(pos < 0) throw new TypeError('Position is lower than 0')
    if(pos > max) throw new TypeError('Position is bigger than max')
  }

  get url(){
    if(!this.current) return location.href
    return this.current.url
  }

  get list(){
    return this._list
  }

  get length(){
    return this._list.length
  }

  get current(){
    return this._list[this.position]
  }

  get last(){
    return this._list[this._list.length - 1]
  }
}

if(typeof window != 'undefined'){
  window.HistoryPP = HistoryPP
}

export default HistoryPP

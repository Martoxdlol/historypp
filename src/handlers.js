import Action from './action'

export default function handleEventsListeners(historyController) {

  historyController.addEventListener('backward', event => {
    //save last position for the event
    const lastPosition = this.position
    if (this.position == 0) {
      //launch exit event, (ask user if he sure)
      // TODO: launch event
      const cancelled = this.testBlocked('Exit', event) || this.launchEvent('exit', { lastPosition })
      if (!cancelled) historyController.exit()
    } else {
      this.position--
      // TODO: launch event
      const cancelled = this.testBlocked('Back', event) || this.launchEvent('backward', { lastPosition })
      if (cancelled) this.position = lastPosition
    }
    //Set url
    historyController.url = this.url
  })

  historyController.addEventListener('forward', event => {
    if (this.current.position < this.last.position) {
      //save last position for the event
      const lastPosition = this.position
      this.position++
      // TODO: launch event
      const cancelled = this.testBlocked('Forward', event) || this.launchEvent('forward', { lastPosition })
      //if event cancelled -> this.position = lastPosition
      if (!cancelled) historyController.url = this.current.url
      else this.position = lastPosition
    }
    if (this.current == this.last) historyController.disableForwardButton()
    //Set url
    historyController.url = this.url
  })

  historyController.addEventListener('navigate', event => {
    const lastPosition = this.position
    let state = null
    let options = null
    //this enables user to set state directly when route is being created
    const setState = _state => {
      state = _state
    }
    //this enables user to set options directly when route is being created
    const setOptions = _options => {
      options = _options
    }

    this._push(event.url, state, options)
    // TODO: launch event
    const cancelled = this.testBlocked('Push', event) || this.launchEvent('push', { lastPosition, setState })
    if (!cancelled) historyController.disableForwardButton()
    else {
      this._pop()
      this.position = lastPosition
    }

    //Set url
    historyController.url = this.url
  })
}

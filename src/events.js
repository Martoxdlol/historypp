class HistoryEvent {
  constructor(data) {
    this.history = data.history
    this.type = data.type
    this.action = data.action
    this.location = data.location
    this.lastPosition = data.lastPosition
    this._position = data.position ?? data.history.position
    this.route = data.history.last
    this.replaced = data.replaced
  }

  get position() {
    return this._position
  }

  get movement() {
    return this.position - this.lastPosition
  }

  get last() {
    return this.history.list[this.lastPosition]
  }

  retry() {
    if (this.type == 'push') {
      this.history.push(this.route)
    } else if (this.type == 'back') {
      this.history.back()
    } else if (this.type == 'forward') {
      this.history.forward()
    } else if (this.type == 'exit') {
      this.history.exit()
    }
  }
}

export { HistoryEvent }

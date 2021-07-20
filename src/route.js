const DEFAULT_ROUTE_OPTIONS = {

}

export default class HistoryRoute {
  constructor(url, state, options) {
    this.state = state
    this._url = url
    this.options = { ...DEFAULT_ROUTE_OPTIONS, ...options }
  }

  mount(history, baseUrl = '') {
    this.URL = new URL(this.url, new URL(baseUrl, location.href))
    this.history = history
  }

  get url() {
    if (this.URL) {
      return this.URL.pathname + this.URL.search + this.URL.hash
    } else {
      return this._url
    }
  }


  set url(u) {
    if (this.URL) {
      this.URL = new URL(u, this.URL)
    } else {
      this._url = u
    }
  }

  _tryURL() {
    if (!this.URL) throw new TypeError('Route should be mounted first')
  }

  get position() {
    return this.history.list.indexOf(this)
  }

  get href() {
    this._tryURL()
    return this.URL.href
  }

  get pathname() {
    this._tryURL()
    return this.URL.pathname
  }

  get search() {
    this._tryURL()
    return this.URL.search
  }

  get hash() {
    this._tryURL()
    return this.URL.hash
  }

  get query() {
    this._tryURL()
    const q = {}
    for (const k of this.URL.searchParams.keys()) {
      q[k] = this.URL.searchParams.get(k)
    }
  }
}

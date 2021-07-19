
# History Plus Plus

## History

* `history.push(routePath, state?, options?)`
* `history.push(routePath, state?, options?)`
* `history.back()` go back
* `history.forward()` go forward
* `history.go(n)` go back or forward n or -n times
* `history.pop(pos)` removes route from position
* `history.get(pos)` get route from position
* `history.insert(pos, routePath, state?, options?)` insert route into position
* `history.insertAndGo(pos, routePath, state?, options?)` insert route and navigate to
* `history.insertReplace(pos, routePath, state?, options?)` insert route replacement
* `history.insertReplaceAndGo(pos, routePath, state?, options?)` insert route replacement and navigate to
* `history.position` actual history position
* `history.list` history routes list
* `history.last` history routes list last element
* `history.length` history routes list length
* `history.actual` actual route
* `history.url` actual route url
* `history.state` actual route state (any data)
* `history.url` actual route url (and actual page url)
* `history.pathname` route url pathname
* `history.search` actual route url search
* `history.hash` actual route url hash


## Event

* `event.action` navigate | push | forward | backward | insert | pop | replace
* `event.movement` route position difference (only on push or navigate events)
* `event.position` actual position or affected position (like pop event)
* `event.lastPosition` previos position  (only on push or navigate events)
* `event.last` previous route
* `event.route` actual route  (push or navigate events)
* `event.isNewRoute` true when pushed new route
* `event.cancel()`
* `event.setState(state)` works only on push event
* `event.setOptions(options)` works only on push event

## Events

`locationchange`
`replace`
`pop`
`push`
`insert`
`exit`


## Route

* `route.state` route state (any data)
* `route.url` route url
* `route.pathname` route url pathname
* `route.search` route url search
* `route.query` route url search params
* `route.hash` route url hash
* `route.position` position on history
* `route.next` next route
* `route.prev` previous route

### Route options
* `title` changes document.title if history option `useTitle` toggled on
* `popOnBack` destroys route on back from there (launches event)
* `popOnForward` destroys route on forward from there (launches event)

## Options

* `bool: options.useHashRouter = false` routes will be like `#!/route_path`
* `bool: options.ignoreHashChange = true` history won't keep any track of hash changes
* `bool: options.useTitle = false` change document.title depending on routes

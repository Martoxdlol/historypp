History Plus Plus
=================

This module serves as a replacement for Chrome's native history api.

```javascript
import { createHistory } from 'historypp'
const historypp = createHistory(history)

//or

const historypp = initHistoryPlusPlus(history) //global function

```

# History stack or list

`historypp.position //value from: 0 - 2`

`historypp.list //list of pages navigated: [{...},{...},{...}]`

HistoryPP stores navigation list on history.list, you can go forwad and backward throw the list
with total freedom. Also you cand modify the list and the navigation won't break

# methods

```javascript
historypp.navigate(url[,options,state]) //url can be relative or absolute.
//The state will be saved on historypp.list[position].state
//You can get the state with historypp.state or historypp.getActualData().state

historypp.getActualData() //Returns list item from actual position

historypp.back()

historypp.forward()

historypp.navigateReplace(url[,options,state]) //Navigate one as normal and then deletes previous item
//and does historypp.position--
//Also launches 'splice' event

historypp.navigatePopOnBack(url[,options,state]) //When navigated back from a page pushed with this method
//it's item on list gets removed
//Also launches 'splice' event

preventBackOnce(url,callback)// returns: {cancel:[function: cancel]} //it doesn't create a item on list but creates a listener that
//calls callback when back button clicked and remove the listener
//It can be cancelled
//It doesn't affect historypp.url getter

historypp.addEventListenr(name, callback)

historypp.removeEventListenr(name, callback)

/// GETTERS

historypp.length

historypp.url

historypp.state

/// SETTERS

historypp.state
```

# One time back listener (preventBackOnce)

```javascript
const listener = historypp.preventBackOnce(() => {
    console.log("clicked back!")
})

listener.cancel()

```

# Events

```javascript
historypp.addEventListenr('locationchanged', item => {
    console.log(item.position)
    console.log(item.type)
    console.log(item.movement)
    console.log(item.state)
    console.log(item.url)
})

historypp.addEventListenr('forward', item => {
    console.log(item.position)
    console.log(item.type)
    console.log(item.movement)
    console.log(item.state)
    console.log(item.url)
})

historypp.addEventListenr('back', item => {
    console.log(item.position)
    console.log(item.type)
    console.log(item.movement)
    console.log(item.state)
    console.log(item.url)
})

historypp.addEventListenr('hashchange', item => {
    console.log(item.newhash)
    console.log(item.lasthash)
    //When hash changed but not navigated it launches this event
})

historypp.addEventListenr('splice', item => {
    console.log(item.start)
    console.log(item.length)
    someCopyOfHistoryList.splice(item.start, item.length) //Check historypp-react-router
})

```


import handleEvent from './handler'
import { NavigationList, NavigationItem } from './classes'
import { delayed } from './util'
const DEFAULT_OPTIONS = {}

class HistoryPlusPlus{

}


function createHistory(originalHistory = history, options = {}){
  //if server send mock history and take url from options
  //...
  //client
  return new HistoryPlusPlus(originalHistory, options)
}

export default { createHistory }

export { createHistory }

if(typeof window == 'object'){
  window.initHistoryPlusPlus = createHistory
}

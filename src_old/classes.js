class NavigationList {
  constructor(){
    this.list = []
  }

  replaceState(){

  }

  pushState(){
    
  }

  push(item){
    this.list.push(item)
  }
}

class NavigationItem {
  constructor(url, state){
    this.url = url
    this.state = state
  }
}

export { NavigationList, NavigationItem }

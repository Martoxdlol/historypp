//History rewrite
/*
Primera carga un pushState comun para habilitar una navegacion interna para atras
El control de la navegacion de las página es completamente interno
Si se esta en la primera página cargada y se da back, se tine que dar un extra back para contrarestar el primer pushState virtual y salir de la página a menos que se haya activado el prevenir back
Prevenir back, basicamente navega uno para adelante para deshacer el back y no emite ningun evento virtual de navegacion (solo click back)
Prevenir forward, basicamente hace un back y pushState que te elimine las ultimas posiciones de navegacion y no emite ningun evento virtual. Mas detalles: Se utiliza en los one click back listeners (basicamente dialogs) o en páginas que se usan una sola vez, al estilo flutter.
One click back listener (se puede convinar con prevent back). Previene el back de la página una vez y emite un callback de ese registro especifico del evento (para los dialogs). Se pueden acumular varios y no tienen que activarse en orden
Navegacion virtual y eventos: Cada vez que si se realiza una navegacion se emite un evento custom con toda la info (pa tras o pa delante, si es pa atras te tira los datos de esa naveagcion (el state), si es pa delante (forward) te tira el state tambien, timestamp, navigation position, url, datos de state, datos de scroll, HISTORY_STATE_ID)
Datos de estado:
Tipos de navegacion virtual: Se pueden establecer tipos, si es navegacion de pagina o adentro de una misma, (hay que ver como)
Algunos métodos: navigate(url, options, data), replace(url, options, data), back(), backPreventForward(), navigateBack(), navigatePreventForward(url, options, data), preventForward(), preventBack(true|false), preventBackOneTime(callback)
  preventBackOneTime(callback) #Si se activa con preventBack no surge efecto hasta que se descative preventBack
  navigateBack() #Ignora los oneTimePreventback (ingnora los modals) y navega para atras. El navigate común para adelante hace lo mismo
options: Tipo de navegacion, título (sirve para compatibilidad), keepScroll, scrollMainComponent, otras cosas a definir
Eventos: navigate: atras/adelante + info. back: atras + info. forward: adelante + info. backClick
getters: history.list, actualUrl, state/data, canGoForward, canGoBack
aliasaes: pushState => navigate, replaceState => replace, go => hacer un go limitado que pueda mantener cierta compatibilidad
Scroll: Se mantiene un registro de el scroll necesario de cada navegacion. Tambien se aplica scroll a un #scrollmain_HISTORY_STATE_ID
HISTORY_STATE_ID: hace referencia a un sistema interno de mantener el historial de las navegaciones
Hashes en url: Usar como navegaciones de tipo hash o como oneTimePreventback (), ademas configurable

Idea de funcionamiento: basciamente la idea es que solo se manejen la minima cantidad necearias de navegaciones en le history nativo. Y que siempre se puede hacer uno para atras si hace falta y uno o no para adelante segun el prevent forward o el historial virtual que es el que importa
  Se mantiene un historial interno que es el real para la app con todas las funciones actuales (vendria a ser el history.list)
*/

import events from './events'
import serverMockHistory from './serverMockHistory'

let instance

class HistoryPlusPlus{
  constructor(originalHistory, options){
    if(!originalHistory && typeof window == 'undefined'){
      this.originalHistory = serverMockHistory()
    }
    this.originalHistory = originalHistory //native history
    this.list = [] //list of navigations {url,title,options,state}
    this.preventBack = false //do nothing on back event
    this.preventExit = false //do nothing when exiting app going back
    this.location = {href:'http://localhost/',pathname:"/",search:"",hash:""}
    if(typeof window != 'undefined' && typeof window.location != 'undefined') this.location = window.location
    this.initHistory(options)
  }


  fakePreventList(){
    this.preventBackList = []
    // this.preventBackList = {
    //   push(...val){
    //     if(this.list[this.position]){
    //       if(!this.list[this.position].preventBackList) this.list[this.position].preventBackList = []
    //       this.list[this.position].preventBackList.push(...val)
    //     }
    //   },
    //   splice(...val){
    //     if(this.list[this.position]){
    //       if(!this.list[this.position].preventBackList) this.list[this.position].preventBackList = []
    //       this.list[this.position].preventBackList.splice(...val)
    //     }
    //   },
    //   pop(...val){
    //     if(this.list[this.position]){
    //       if(!this.list[this.position].preventBackList) this.list[this.position].preventBackList = []
    //       this.list[this.position].preventBackList.pop(...val)
    //     }
    //   },
    //   get length(){
    //     if(this.list[this.position]){
    //       if(!this.list[this.position].preventBackList) this.list[this.position].preventBackList = []
    //       return this.list[this.position].preventBackList.length
    //     }
    //     return 0
    //   }
    // }
    //
    // this.__defineGetter__('preventBackList', val => {
    //   const item = this.list[this.position] || {}
    //   const l = item.preventBackList || []
    //   return l
    // })
  }

  initHistory(options){
    this.fakePreventList()

    options = {autoRestore: true, ...options}
    this.options = options
    const initialState = {...this.originalHistory.state}
    if(initialState.initTimestamp && options.autoRestore){
      this.loadDataFromLocal(initialState.initTimestamp)
    //   try {
    //     const prevList = JSON.parse(localStorage.getItem('prev_historypp_list:'+initialState.initTimestamp))
    //     const prevListPosition = parseInt(JSON.parse(localStorage.getItem('prev_historypp_position:'+initialState.initTimestamp)))
    //     if(Number.isFinite(prevListPosition) && prevListPosition >= 0) this.position = prevListPosition
    //     if(Array.isArray(prevList)){
    //       console.log("History loaded from localStorage")
    //       this.list = prevList
    //     }
    //   } catch (e) {}
    }
    this.initTimestamp = initialState.initTimestamp || Date.now()
    if(!this.position) this.position = 0
    this._lastPosition = this.position
    this._replace(0)
    this._push(1)
    if(this.list.length == 0) {
      this._navigate(this.getCorrectUrl(),{},options.initialData)
    }else{
      if(this.position < this.list.length-1) this.enableForwardButton()
      this.correctUrlWithRetard()
    }


    window.addEventListener('popstate', event => {
      if(!history.state){
        //Probably hash changed
        const newurlnh = this.getActualUrlNoHash()
        const newurl = this.getActualUrl()
        const newhash = this.getActualHash()
        const lastUrlNHash = this.getActualData().url.split("#")[0]
        const lastHash = this.getActualData().url.replace(this.getActualData().url.split("#")[0],'')
        this._replace(2,this.getCorrectUrl())
        this.originalHistory.back()
        if(!this._forwardButtonEnabled) this.disableForwardButton()


        if(lastUrlNHash == newurlnh && !this.options.hashNavigation){
          //only hash or nothing changed
          events.launchEvent('hashchange', {lastHash, hash:newhash})
          this.list[this.position].sublist.push({url:newurl})
          this.correctUrlWithRetard()
        }else if(lastUrlNHash == newurlnh && this.options.hashNavigation){
          //only hash or nothing changed
          this._onlyHashChanged = true
          events.launchEvent('hashchange', {lastHash, hash:newhash})
          this.position++
          this._navigate(newurl,{},this.originalHistory.state)
          this.navEventAuto()
          this.correctUrlWithRetard()
        }else{
          this.position++
          this._navigate(newurl,{},this.originalHistory.state)
          this.navEventAuto()
          this.correctUrlWithRetard()
        }

        this.saveHistoryToLocal()

        this._preventEvent = true
        return;
      }else
      if(history.state.initHistory < Date.now()){
        while(true){
          this.originalHistory.back()
        }
      }

      //Flag used to know later if it has to leave the page and go back one more time
      let goBackToOrigin = false

      //test if back or forward
      const pos = this.originalHistory.state.pos
      if(pos == 0){
        //back

        //_preventEvent
        //Usend when will go back to pos 1 but we won't to do anything

        //Only do something if back enabled
        if(!this.preventBack && this.preventBackList.length == 0 && !this._preventEvent && (!this.list[this.position] || !this.list[this.position].sublist || this.list[this.position].sublist.length == 0)){
          //Launch back event
          this.position--
          if(this.position <= -1){
            //if position == -1 it mean user tried exit the page going back

            //this message only will be displayed if something prevents exit (ej: preventExit flag)
            console.log("GO BACK (prevented exit)")
            //Go back from first page
            goBackToOrigin = true

          }else{
            //Go back from non first page
            //do virtual navigation
            // ...
            //Launch navigation back vitual event
            console.log("VIRTUAL BACK", this.position, this.list[this.position].url);

            //Check if unfordward
            if(this.list[this.position+1] && this.list[this.position+1].options && (this.list[this.position+1].options.unfordward || this.list[this.position+1].options.onlyOneTime)){
              this.list.splice(this.position+1,1)
              events.launchEvent('splice',{start:this.position+1,length:1})
            }

            const url = this.list[this.position].url || ""

            this.correctUrlWithRetard()
            this.navEventAuto()

            // console.log(url, this.position);
            // this._replace(this.originalHistory.state.pos,url)
          }

          this.saveHistoryToLocal()
        }else if(this.preventBackList.length > 0 && !this._preventEvent){
          //Trigger oneTimePreventback list items
          const action = this.preventBackList[this.preventBackList.length-1]
          if(typeof action.callback == 'function'){
            try {
              action.callback()
            } catch (e) {
              console.error(e)
            }
          }
          this.preventBackList.pop()
          // this._disableForwardButton = true
          this.saveHistoryToLocal()
        }else if(this.list[this.position] && this.list[this.position].sublist.length > 0 && !this._preventEvent){
          //Sublist used for internal position navigation with hash
          this.list[this.position].sublist.pop()
          this.correctUrlWithRetard()
          this.saveHistoryToLocal()
        }

        this._preventEvent = false

        if(goBackToOrigin && !this.preventExit){
          this.originalHistory.go(-1)
        }else{
          if(this._disableForwardButton){
            this._disableForwardButton = false
            this._push(1)
          }else{
            this.originalHistory.go(1)
          }
          const url = this.list[this.position].url || ""

          // console.log(url, this.position);
          // this._replace(this.originalHistory.state.pos,url)

          this.correctUrlWithRetard()
          this.navEventAuto()

          setTimeout(() => {
            if(this.position+1 < this.list.length && !this._forwardButtonEnabled){
              console.log("ENABLING FORWARD");
              this.enableForwardButton()
            }
          }, 50)
        }
      }else if(pos == 2){
        //forward
        // if(!this.list[this.position+1]) return;
        this.originalHistory.back()
        this.position++
        if(!this.list[this.position]){
          this.position--
        }
        console.log("VIRTUAL FORWARD", this.position, this.list[this.position].url);
        const url = this.list[this.position].url || ""

        this.correctUrlWithRetard()
        this.navEventAuto()

        setTimeout(() => {
          this._replace(1,url)
          if(this.position+1 >= this.list.length) {
            console.log("DESABLING FORWARD");
            this.disableForwardButton()
          }
        }, 10);
      }
    })
  }

  enableForwardButton(){
    this._forwardButtonEnabled = true
    this._push(2)
    this.originalHistory.back()
  }

  async disableForwardButton(){
    this._preventEvent = true
    this._disableForwardButton = true
    this.originalHistory.back()
    this._forwardButtonEnabled = false
  }

  getCorrectUrl(){
    let url = (this.list[this.position] && this.list[this.position].url) || this.getActualUrl() || ''
    if(this.list[this.position] && this.list[this.position].sublist.length > 0){
      url = this.list[this.position].sublist[this.list[this.position].sublist.length-1].url
    }
    let i = this.preventBackList.length-1
    while(i >= 0){
      if(this.preventBackList[i].url){
        url = this.preventBackList[i].url
        break;
      }
      i--
    }
    return url
  }

  correctUrl(){
    this._replace(this.originalHistory.state.pos,this.getCorrectUrl())
  }

  correctUrlWithRetard(){
    return;
    clearTimeout(this._timeoutCorrectUrlWithRetard)
    this._timeoutCorrectUrlWithRetard = setTimeout(() => {
      this.correctUrl()
      if(this.position == this.list.length-1 && this._forwardButtonEnabled) this.disableForwardButton()
      //UPDATE DOCUMENT TITLE
      for(const child of document.head.children){
          if(child.tagName == 'TITLE'){
              const t = child.innerHTML
              document.title = null
              document.title = t
          }
      }
    }, 50)
  }

  killListFrom(pos){
    this.list.splice(pos)
  }

  _completeUrl(url){
    url = url || ''
    let turl = this.getUrl() || ''
    if(turl[0] != "/")turl = "/"+turl
    const _url = new URL(url, 'http://localhost'+turl)
    return _url.pathname+_url.search+(_url.hash||'')
  }

  navigate(url, options, state){
    this.position++
    this._navigate(this._completeUrl(url), options, state)
    this.navEventAuto()
    this.correctUrlWithRetard()
  }

  navigateReplace(url, options, state){
    this.position++
    this._navigate(this._completeUrl(url), options, state)
    this.navEventAuto()
    this.correctUrlWithRetard()
    this.list.splice(this.position,1)
    this.position--
    this._lastPosition--
    events.launchEvent('splice',{start:this.position,length:1,movement:-1})
  }

  navigatePopOnBack(url, options, state){
    const title = typeof options == 'string' ? options : (options && options.title)
    options = {title, ...options, onlyOneTime:true}
    this.navigate(url,options,state)
  }

  _navigate(url, options, state){
    url = this._completeUrl(url)
    let title = null
    if(typeof options == "string") title = options
    options = {title, ...options}
    this.killListFrom(this.position)
    this.list.push({
      sublist: [],
      url,
      timestamp: Date.now(),
      state,
      isnew: true,
      get title(){
        return options.title
      },
      options,
    })
    this.saveHistoryToLocal()
  }

  _navEvent(type, position){
    //Launch event
    //Launched on first time directly, then used by navEventAuto
    //use list to get info to launch
  }

  navEventAuto(){
    //test using position and lastPosition if navigate, forward or back.
    //Test also if is really necesary to launch it
    //use _navEvent to launch it

    let movement = this.position - this._lastPosition
    const hashchange = this._onlyHashChanged
    const data = this.getActualData()
    if(data.isnew){
      this.list[this.position].isnew = false
      const mainScroll = (data.options && data.options.mainScroll) || window
      mainScroll.scroll(0,0)
    }

    if(movement > 0){
      const type = data.isnew ? 'navigate' : 'forward'
      events.launchEvent('navigate', {...data, data, hashchange, movement, type, position: this.position, lastPosition: this._lastPosition, isnew: data.isnew})
      events.launchEvent('forward', {...data, data, hashchange, movement, type, position: this.position,  lastPosition: this._lastPosition, isnew: data.isnew})
      events.launchEvent('locationchange', {...data, hashchange, data, movement, type, position: this.position,  lastPosition: this._lastPosition, isnew: data.isnew})
      events.launchEvent('locationchanged', {...data, hashchange, data, movement, type, position: this.position,  lastPosition: this._lastPosition, isnew: data.isnew})
    }else if(movement < 0){
      events.launchEvent('back', {...data, data, movement, type: 'back', position: this.position,  lastPosition: this._lastPosition, isnew: false})
      events.launchEvent('locationchange', {...data, data, hashchange, movement, type: 'back', position: this.position,  lastPosition: this._lastPosition, isnew: false})
      events.launchEvent('locationchanged', {...data, data, hashchange, movement, type: 'back', position: this.position,  lastPosition: this._lastPosition, isnew: false})

    }

    this._onlyHashChanged = false
    this._lastPosition = this.position

  }

  _push(pos,url,title){
    url = this._completeUrl(url)
    if(url == undefined){ //necessary for IE
      url = this.getActualUrl()
    }
    this.originalHistory.pushState({pos,initTimestamp: this.initTimestamp, timestamp: Date.now()},title||null,url)
  }

  _replace(pos,url,title){
    url = this._completeUrl(url)
    if(url == undefined){ //necessary for IE
      url = this.getActualUrl()
    }
    this.originalHistory.replaceState({pors:pos != undefined ? pos : this.position,initTimestamp: this.initTimestamp, timestamp: Date.now()},title||null,url)
  }

  pushReplacement(...args){
    navigateReplace(...args)
  }

  back(){
    this.originalHistory.back()
  }

  preventBackOnce(callback, url, state){
    url = this._completeUrl(url)
    const index = this.preventBackList.length
    const id = Date.now()+"_"+index
    this.preventBackList.push({
      id,
      callback,
      url,
      state,
    })
    this._replace(undefined,this._completeUrl())
    this.correctUrlWithRetard()
    let cancelled = false
    return {
      cancel: ()=>{
        if(cancelled) return;
        cancelled = true
        for(let i = 0; i < this.preventBackList.length; i++){
          if(this.preventBackList[i].id == id){
            this.preventBackList.splice(i,1)
            break;
          }
        }
        this.correctUrlWithRetard()
      }
    }
  }

  static getActualUrl(){
    return location.pathname+location.search+(location.hash || "")
  }

  getActualUrl(){
    return this.location.pathname+this.location.search+(this.location.hash || "")
  }

  static getActualUrlNoHash(){
    return location.pathname+location.search
  }

  getActualUrlNoHash(){
    return this.location.pathname+this.location.search
  }

  static getActualHash(){
    return (location.hash || "")
  }

  getActualHash(){
    return (this.location.hash || "")
  }

  saveHistoryToLocal(){
    localStorage.setItem('prev_historypp_v001_data', JSON.stringify({initTimestamp:this.initTimestamp,list:this.list,position:this.position}))
    // localStorage.setItem('prev_historypp_list:'+this.initTimestamp, JSON.stringify(this.list))
    // localStorage.setItem('prev_historypp_position:'+this.initTimestamp, this.position)
    // try {
    //   const lslist = {...localStorage}
    //   const keys = Object.keys(lslist)
    //   for(const key of keys){
    //     if(key.search("prev_historypp_list:") == 0){
    //       const t = parseInt(key.replace("prev_historypp_list:"))
    //       if(!((t+120000) > Date.now()) && t < this.initTimestamp) localStorage.removeItem(key)
    //     }else
    //     if(key.search("prev_historypp_position:") == 0){
    //       const t = parseInt(key.replace("prev_historypp_position:"))
    //       if(!((t+120000) > Date.now()) && t < this.initTimestamp) localStorage.removeItem(key)
    //     }
    //   }
    // } catch (e) {}
  }

  loadDataFromLocal(initTimestamp){
    try {
      let data = localStorage.getItem('prev_historypp_v001_data')
      if(!data) return;
      data = JSON.parse(data)
      if(data.position && Number.isInteger(data.position) && Array.isArray(data.list) && data.initTimestamp == initTimestamp){
        this.position = data.position
        this.list = data.list
        if(this.position < 0) this.position = 0
        if(this.position > this.list.length-1) this.position = this.list.length-1
        console.log("History loaded from localStorage",initTimestamp)
      }
    } catch (e) {}
  }

  getActualData(){
    const d = {...this.list[this.position]}
    return d
  }

  getUrl(){
    return this.getActualData().url
  }

  //Getters
  get forwardButtonEnabled(){
    return this._forwardButtonEnabled
  }

  set forwardButtonEnabled(value){
    if(value){
      this.enableForwardButton()
    }else{
      this.disableForwardButton()
    }
  }

  get length(){
    return this.list.length
  }

  get url(){
    return this.getUrl()
  }

  get state(){
    return this.getActualData().state
  }

  set state(state){
    return this.list[this.position].state = state
  }

  on(...args){
    return events.on(...args)
  }

  addEventListener(...args){
    return events.addEventListener(...args)
  }

  removeEventListener(...args){
    events.removeEventListener(...args)
  }

  pushState(a,b,c){
    this.navigate(a,b,c)
  }

  forward(){
    this.originalHistory.forward()
  }

  replaceState(data, options, url){
    let title = options || null
    if(typeof options != "string"){
      options = {...options}
      title = options.title
    }
    this.list[this.position].state = data
    this.list[this.position].url = url
    this._push(this.originalHistory.state.pos, url, title)
  }
}


function createHistory(originalHistory = history, options = {}){
  //if server send mock history and take url from options
  //...
  //client
  instance = new HistoryPlusPlus(originalHistory, options)
  return instance
}

instance = {createHistory}

export default instance

export { createHistory, serverMockHistory }

if(typeof window == 'object'){
  window.initHistoryPlusPlus = createHistory
}
// module.exports = instance
// exports.createHistory = createHistory
//
// //Only if client
// window.initHistoryPlusPlus = createHistory

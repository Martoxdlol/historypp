import React, { Component } from 'react'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }

    this.updateInfo = this.updateInfo.bind(this)
  }

  componentDidMount() {
    history2.addEventListener('locationchanged', e => {
      console.log("EVENT",e)
      this.updateInfo(e)
    })
    history2.addEventListener('hashchanged', e => {
      console.log(e)
      this.updateInfo(e)
    })
    history2.addEventListener('preventbacklistchanged', e => {
      console.log(e)
      this.updateInfo(e)
    })
    history2.addEventListener('statechanged', e => {
      console.log(e)
      this.updateInfo(e)
    })
    this.updateInfo()
  }

  updateInfo(e = {}){
    this.setState({
      "(EVENT) type": e.type,
      "(EVENT) movement": e.movement,
      "Actual position URL": history2.url,
      "Actual real URL": history2.getCorrectUrl(),
      "History position": history2.position,
      "History list length": history2.length,
      "State": history2.state,
      "Title (unused)": history2.title,
      "Prevent back list": history2.preventBackList,
      "List": history2.list,
    })
  }

  render() {
    return (
      <div>
        <ul>
          {Object.keys(this.state).map(key => {
            return <li key={key}><b>{key}:</b> {getShowValue(this.state[key])}</li>
          })}
        </ul>
        <textarea id="eval-code" defaultValue={template}></textarea>
        <button type="button" onClick={()=>{
          try {
            eval(makeEvalTemplate(document.getElementById('eval-code').value))
          } catch (e) {
            console.error(e)
          }
        }}>Do eval()</button>
      </div>
    )
  }
}

function getShowValue(value) {
  if(value === undefined){
    return <i>undefined</i>
  }if(value === null){
    return <i>null</i>
  }else if(typeof value === 'object'){
    return JSON.stringify(value)
  }else{
    return value.toString()
  }
}


var template = `history2.navigate("/anypage")

await delay(1000)

history2.navigate("/anypage2/")

await delay(1000)

history2.back()

await delay(3000)

history2.navigate("page/subdir")

await delay(1000)

history2.state = {message:"DEMO"}

await delay(1000)

history2.preventBackOnce(()=>{
   console.log("OK")
})

await delay(1000)

history2.back()`

function makeEvalTemplate(code){
  return `function delay(ms){
    return new Promise((res,rej)=>{
      setTimeout(() => {
        res()
      }, ms)
    })
  }

  main()
  async function main(){
    ${code}
  }`
}

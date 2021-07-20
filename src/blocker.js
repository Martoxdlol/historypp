import Action from './action'

export default function blocker() {
   this.blockBack = (cb) => {
        this.blockedBackList.push(cb)
        return () => {
            const index = this.blockedList.indexOf(cb)
            if (index != -1) {
                this.blockedList.splice(index, -1)
                return true
            }
        }
    }

    //This function is compatible with npm 'history' package
    this.block = (cb) => {
        this.blockedList.push(cb)
        return () => {
            const index = this.blockedList.indexOf(cb)
            if (index != -1) {
                this.blockedList.splice(index, -1)
                return true
            }
        }
    }

    this.testBlocked = (action, event) => {
        if(!this.blocked) return false
        //this functions retuns true if blocked and false if not blocked
        const location = event.location
        const retry = event.retry
        if(this.blockedBackList[0] && action == "Back"){
            this.blockedBackList({ action, location, retry})
        }else {
            const _action = Action[action]
            for(const cb of this.blockedList){
                cb({ action: _action, location, retry })
            }
        }

        return true
    }
}
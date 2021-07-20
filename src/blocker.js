import Action from './action'

export default function blocker() {
    this.blockBack = (cb) => {
        this.blockedBackList.push(cb)
        return () => { this.blockedBackList = this.blockedBackList.filter((function (t) { return t !== cb })) }
    }

    //This function is compatible with npm 'history' package
    this.block = (cb) => {
        this.blockedList.push(cb)
        return () => { this.blockedList = this.blockedList.filter((function (t) { return t !== cb })) }
    }

    this.testBlocked = (action, event) => {
        if (!this.blocked) return false
        //this functions retuns true if blocked and false if not blocked
        if (this.blockedBackList[0] && action == "Back") {
            this.blockedBackList[0](event)
        } else {
            for (const cb of this.blockedList) {
                cb(event)
            }
        }

        return true
    }
}
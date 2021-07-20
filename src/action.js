//Actions
//This actions are the same as npm 'history' package for comaptibility
const Action = { Pop: "POP", Push: "PUSH", Replace: "REPLACE", Back: "POP", Forward: "POP", Exit: 'POP' }
export default Action
export function typeToAction(type) {
    const t = {
        'forward': 'Forward',
        'backward': 'Back',
        'back': 'Back',
        'push': 'Push',
        'navigate': 'Push',
        'replace': 'Replace',
        'pop': 'Pop',
    }
    return t[type.toLowerCase()]
}
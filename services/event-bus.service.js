
function createEventEmitter() {
    const listenersMap = {}

    return {
        on: (evName, listener) => {
            listenersMap[evName] = (listenersMap[evName]) ? [...listenersMap[evName], listener] : [listener]
            function unsubscribe() {
                listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
            }
            return unsubscribe
        },
        emit: (evName, data) => {
            if (!listenersMap[evName]) return
            listenersMap[evName].forEach(listener => listener(data))
        },
    }
}

export const eventBusService = createEventEmitter()

export function showUserMsg(msg) {
    eventBusService.emit('show-user-msg', msg)
}

export function showSuccessMsg(txt) {
    showUserMsg({ txt, type: 'success' })
}

export function showErrorMsg(txt) {
    showUserMsg({ txt, type: 'error' })
}

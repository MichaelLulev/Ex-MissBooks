import { eventBusService } from "../services/event-bus.service.js"

const { useState, useEffect, useRef } = React

const MSG_TIMEOUT = 3000

export function UserMsg() {
    const [msg, setMsg] = useState(null)
    const timeoutId = useRef()

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', msg => {
            setMsg(msg)
            clearTimeout(timeoutId.current)
            timeoutId.current = setTimeout(() => {
                setMsg(null)
            }, MSG_TIMEOUT)
        })
        return unsubscribe
    })

    if (! msg) return null
    return (
        <div className={`user-msg ${msg.type}`}>{msg.txt}</div>
    )
}
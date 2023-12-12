import { eventBusService } from "../services/event-bus.service.js"

const { useState, useEffect } = React

const MSG_TIMEOUT = 3000

export function UserMsg() {
    const [msg, setMsg] = useState(null)

    useEffect(() => {
        eventBusService.on('show-user-msg', msg => {
            setMsg(msg)
            setTimeout(() => {
                setMsg(null)
            }, MSG_TIMEOUT)
        })
    })

    if (! msg) return null
    return (
        <div className={`user-msg ${msg.type}`}>{msg.txt}</div>
    )
}
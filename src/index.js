const EventBusFactory = () => {
    const listeners = {};

    const fire = (event, payload) => {
        const messages = [];

        if (!listeners[event]) return messages

        for (const listener of listeners[event]) {
            messages.push(listener(payload))
        }
        return messages
    };

    const listen = (event, listener) => {
        if (!listeners[event]) {
            listeners[event] = [listener]
        } else {
            listeners[event].push(listener)
        }

        return listener;
    };

    const unsubscribe = (event, removeListener) => {
        listeners[event] = listeners[event]?.filter(l => l !== removeListener)
    };

    return {
        fire,
        listen,
        unsubscribe
    }
}


module.exports = EventBusFactory

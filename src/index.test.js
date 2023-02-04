const EventBusFactory = require('./index')

test("Test a published message received", () => {
    const EventBus = EventBusFactory();

    EventBus.listen('new-message', payload => `The message is "${payload}"`);

    const message = "You are awesome!";

    expect(EventBus.fire('new-message', message)[0]).toBe(`The message is "${message}"`);
});

test("Test another event subscriber", () => {
    let EventBus = EventBusFactory();

    EventBus.listen('another-event', () => null);

    expect(EventBus.fire('another-event', 'null')).toStrictEqual([null]);
});

test("Test unsubscribe from event", () => {
    let EventBus = EventBusFactory();
    let listener = payload => payload;

    EventBus.listen('new-event', listener);
    EventBus.unsubscribe('new-event', listener);

    expect(EventBus.fire('new-event', true)).toStrictEqual([]);
});

test("Test multiple subscriber", () => {
    const EventBus = EventBusFactory();

    const firstSubscriber = EventBus.listen('same-message', payload => `First listener ${payload}`);
    EventBus.listen('same-message', payload => `Second listener ${payload}`);

    const message = 'You are cool!'

    expect(EventBus.fire('same-message', message))
        .toStrictEqual([
            `First listener ${message}`,
            `Second listener ${message}`
        ]);

    EventBus.unsubscribe('same-message', firstSubscriber)

    expect(EventBus.fire('same-message', message))
        .toStrictEqual([
            `Second listener ${message}`
        ]);
});

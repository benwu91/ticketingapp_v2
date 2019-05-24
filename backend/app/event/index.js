const DEFAULT_PROPERTIES = {
    eventId: undefined,
    title: 'unnamed',
    eventDate: '',
    beginTime: '',
    endTime: '',
    eventAddress: '',
    eventDescription: ''
}

class Event {
    constructor({ eventId, title, eventDate, beginTime, endTime, eventAddress, eventDescription } = {}) {
        this.eventId = eventId || DEFAULT_PROPERTIES.eventId;
        this.title = title || DEFAULT_PROPERTIES.title;
        this.eventDate = eventDate || DEFAULT_PROPERTIES.eventDate;
        this.beginTime = beginTime || DEFAULT_PROPERTIES.beginTime;
        this.endTime = endTime || DEFAULT_PROPERTIES.endTime;
        this.eventAddress = eventAddress || DEFAULT_PROPERTIES.eventAddress;
        this.eventDescription = eventDescription || DEFAULT_PROPERTIES.eventDescription;
    }
}

module.exports = Event;
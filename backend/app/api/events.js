const { Router } = require('express');
const EventTable = require('../event/table');

const router = new Router();

router.get('/', (req, res, next) => {
    return EventTable.getEvents()
        .then(events => res.json({ events }))
        .catch(error => next(error));
});

router.post('/new', (req, res, next) => {
    const { event } = req.body;
    EventTable.storeEvent(event)
        .then(eventId => res.json({ eventId }))
        .catch(error => next(error));
});

module.exports = router;
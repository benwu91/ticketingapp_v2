const { Router } = require('express');
const AccountTable = require('../account/table');
const TicketTable = require('../ticket/table');
const Session = require('../account/session');
const { hash } = require('../account/helper');
const { setSession, authenticatedAccount } = require('./helper');

const router = new Router();

router.post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);

    AccountTable.getAccount({ usernameHash })
        .then(({ account }) => {
            if (!account) {
                return AccountTable.storeAccount({ usernameHash, passwordHash });
            } else {
                const error = new Error('This username has already been taken');
                error.statusCode = 409;
                throw error;
            }
        })
        .then(() => {
            return setSession({ username, res })
        })
        .then(({ message }) => {
            res.json({ message });
        })
        .catch(error => next(error));
});

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);

    AccountTable.getAccount({ usernameHash })
        .then(({ account }) => {
            if (account && account.passwordHash === passwordHash) {
                const { sessionId } = account;
                return setSession({ username, res, sessionId });
            } else {
                const error = new Error('Incorrect username/password');

                error.statusCode = 409;

                throw error;
            }
        })
        .then(({ message }) => res.json({ message }))
        .catch(error => next(error));
});

router.get('/logout', (req, res, next) => {
    const { username } = Session.parse(req.cookies.sessionString);

    AccountTable.updateSessionId({ 
        sessionId: null, 
        usernameHash: hash(username) 
    })
    .then(() => {
        res.clearCookie('sessionString');

        res.json({ message: 'Successful logout' });
    })
    .catch(error => next(error));
});

router.get('/authenticated', (req, res, next) => {
    const { sessionString } = req.cookies;
    
    authenticatedAccount({ sessionString })
        .then(({ authenticated }) => res.json({ authenticated }))
        .catch(error => next(error));
});

router.get('/tickets', (req, res, next) => {
    const { sessionString } = req.cookies;
    
    authenticatedAccount({ sessionString })
        .then(({ account }) => {
            return TicketTable.getTickets({
                accountId: account.id
            })
        })
        .then(tickets => res.json(tickets))
        .catch(error => next(error));
});

router.post('/book', (req, res, next) => {
    const { eventId } = req.body;
    const { sessionString } = req.cookies;
    
    authenticatedAccount({ sessionString })
        .then(({ account }) => {
            const accountId = account.id;
            return TicketTable.storeTicket({ accountId, eventId })
        })
        .catch(error => next(error));
});

module.exports = router;
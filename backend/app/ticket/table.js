const pool = require('../../databasePool');
const { generateCode } = require('./helper');

class TicketTable {
    static storeTicket({ accountId, eventId }) {
        const code = generateCode({ accountId, eventId });
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO ticket("accountId", "eventId", code) VALUES ($1, $2, $3)',
                [accountId, eventId, code],
                (error, response) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve();
                }
            )
        })
    }

    static getTicket({ accountId, eventId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT * FROM ticket WHERE "accountId" = $1 AND "eventId" = $2`,
                [accountId, eventId],
                (error, response) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve({ tickets: response.rows });
                }
            )
        })
    }

    static getTickets({ accountId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT "accountId", "eventId", title, "eventDate", "beginTime", "endTime", "eventAddress", "eventDescription", code
                 FROM ticket INNER JOIN account ON account.id = "accountId"
                             INNER JOIN events ON events.id = "eventId"
                 WHERE "accountId" = $1`,
                [accountId],
                (error, response) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve({ tickets: response.rows });
                }
            )
        })
    }
}

module.exports = TicketTable;
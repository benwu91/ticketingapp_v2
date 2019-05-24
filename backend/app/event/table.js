const pool = require('../../databasePool');

class EventTable {
    static storeEvent(event) {
        const { title, eventDate, beginTime, endTime, eventAddress, eventDescription } = event;

        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO events(title, "eventDate", "beginTime", "endTime", "eventAddress", "eventDescription") 
                 VALUES($1, $2, $3, $4, $5, $6) RETURNING id`,
                [title, eventDate, beginTime, endTime, eventAddress, eventDescription],
                (error, response) => {
                    if (error) {
                        return reject(error);
                    }
                    const eventId = response.rows[0].id;

                    resolve({ eventId });
                }
            );
        });
    }

    static getEvents() {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT * FROM events`,
                [],
                (error, response) => {
                    if (error) {
                        return reject(error);
                    }
                    
                    if (response.rows.length === 0) {
                        return reject(new Error('no events'));
                    }
    
                    resolve(response.rows);
                }
            )
        })
    }
};

module.exports = EventTable;
const generateCode = ({ accountId, eventId }) => {
    return `ACCOUNT${accountId}EVENT${eventId}`
}

module.exports = { generateCode };
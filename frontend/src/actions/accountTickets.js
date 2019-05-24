import { ACCOUNT_TICKETS, TICKET } from './types';
import { fetchFromAccount } from './account';

export const fetchAccountTickets = () => fetchFromAccount({
    endpoint: 'tickets',
    options: { credentials: 'include' },
    FETCH_TYPE: ACCOUNT_TICKETS.FETCH,
    ERROR_TYPE: ACCOUNT_TICKETS.FETCH_ERROR,
    SUCCESS_TYPE: ACCOUNT_TICKETS.FETCH_SUCCESS
});

export const bookTicket = ({ eventId }) => fetchFromAccount({
    endpoint: 'book',
    options: {
        method: 'POST',
        body: JSON.stringify({ eventId }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    },
    FETCH_TYPE: TICKET.FETCH,
    ERROR_TYPE: TICKET.FETCH_ERROR, 
    SUCCESS_TYPE: TICKET.FETCH_SUCCESS
});
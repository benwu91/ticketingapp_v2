import { ACCOUNT_TICKETS } from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_ACCOUNT_TICKETS = { tickets: [] };

const accountTickets = (state = DEFAULT_ACCOUNT_TICKETS, action) => {
    switch(action.type) {
        case ACCOUNT_TICKETS.FETCH:
            return {
                ...state,
                status: fetchStates.fetching
            }
        case ACCOUNT_TICKETS.FETCH_ERROR:
            return {
                ...state,
                status: fetchStates.error,
                message: action.message
            }
        case ACCOUNT_TICKETS.FETCH_SUCCESS:
            return {
                ...state,
                status: fetchStates.success,
                message: action.message,
                tickets: action.tickets
            }
        default:
            return state;
    }
}

export default accountTickets;
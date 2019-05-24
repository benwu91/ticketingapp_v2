import { combineReducers } from 'redux';
import account from './account';
import accountTickets from './accountTickets';

export default combineReducers({
    account,
    accountTickets
});
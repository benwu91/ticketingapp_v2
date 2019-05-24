import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAccountTickets } from '../actions/accountTickets';
import AccountTicketCard from './AccountTicketCard';

class AccountTickets extends Component {
    componentDidMount() {
        this.props.fetchAccountTickets();
    }

    render() {
        return (
            <div>
                <Link to='/'>
                    <Button className='home-button'>
                        Home
                    </Button>
                </Link>
                <h3>Account Tickets</h3>
                {
                    this.props.accountTickets.tickets.map(ticket => {
                        return (
                            <div key={ticket.eventId}>
                                <AccountTicketCard ticket={ticket} />
                                <hr />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default connect(
    ({ accountTickets }) => ({ accountTickets }),
    { fetchAccountTickets }
)(AccountTickets);
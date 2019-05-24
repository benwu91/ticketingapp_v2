import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout } from '../actions/account';
import UpcomingEventsList from './UpcomingEventsList';

class Home extends Component {
    render() {
        return (
            <div>
                <Button onClick={this.props.logout} className='logout-button'>
                    Log Out
                </Button>
                <Link to='/tickets'>
                    <Button className='my-tickets-button'>
                        My Tickets
                    </Button>
                </Link>
                <h2>Upcoming Events</h2>
                <UpcomingEventsList />
                <hr />
            </div>
        )
    }
}

export default connect(
    null,
    { logout }
)(Home);
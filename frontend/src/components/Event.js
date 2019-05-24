import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import { bookTicket } from '../actions/accountTickets';

class Event extends Component {
    bookTicket = () => {
        const { id } = this.props.event;
        this.props.bookTicket({ eventId: id });
    }

    render() {
        const { id, title, eventDescription, eventDate, beginTime, endTime, eventAddress } = this.props.event

        return(
            <Card className = 'card'>
                <Card.Body className='card-body'>
                    <Card.Title className='card-title'>{title}</Card.Title>
                    <Card.Text>
                        Date: {eventDate}
                        <br />
                        Time: {beginTime}-{endTime}
                        <br />
                        Address: {eventAddress}
                        <br />
                        Description: {eventDescription}
                        <br />
                    </Card.Text>
                    <Button className='book-button' onClick={this.bookTicket}>Book</Button>
                </Card.Body>
            </Card>
        )
    }
}

export default connect(
    ({ account }) => ({ account }),
    { bookTicket }
)(Event);
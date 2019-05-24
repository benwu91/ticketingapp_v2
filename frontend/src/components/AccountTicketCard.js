import React, { Component } from 'react';
import { Card, Image } from 'react-bootstrap';
import { QRCODEAPI } from '../config';

class AccountTicketCard extends Component {
    render() {
        const { title, eventDescription, eventDate, beginTime, endTime, eventAddress, code } = this.props.ticket;

        const qrCode = `${QRCODEAPI.ADDRESS}${code}`;

        return (
            <Card className = 'card'>
                <Card.Body className='card-body'>
                    <Card.Title className='card-title'>{title}</Card.Title>
                    <Card.Text className='ticket-text'>
                        Date: {eventDate}
                        <br />
                        Time: {beginTime}-{endTime}
                        <br />
                        Address: {eventAddress}
                        <br />
                        Description: {eventDescription}
                        <br />
                    </Card.Text>
                    <Image className='ticket-qrcode' src={qrCode} />
                </Card.Body>
            </Card>
        )
    }
}

export default AccountTicketCard;
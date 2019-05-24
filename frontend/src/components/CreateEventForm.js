import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, FormGroup, FormControl, FormLabel, Form, Col} from 'react-bootstrap';
import { BACKEND } from '../config';

class CreateEventForm extends Component {
    state = {
        title: '',
        eventDate: '',
        beginTime: '',
        endTime: '',
        eventAddress: '',
        eventDescription: ''
    }

    handleChange = event => {
        const{ name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    submitEvent = () => {
        const event = this.state;
        fetch(`${BACKEND.ADDRESS}/events/new`, {
            method: 'POST',
            body: JSON.stringify({ event }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }).then(response => response.json())
          .catch(error => console.error('error', error));
    }

    render() {
        return(
            <div className='create-event-form'>
                <Link to='/'>
                    <Button className='home-button'>
                        Home
                    </Button>
                </Link>
                <h2>Create Event</h2>
                <Form onSubmit={this.submitEvent}>
                    <FormGroup>
                        <FormLabel>Event Title</FormLabel> 
                        <FormControl 
                            type='text'
                            name='title'
                            value={this.state.title}
                            placeholder='My Event'
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    
                    <FormGroup>
                        <FormLabel>Date</FormLabel>
                        <FormControl 
                            type='text'
                            name='eventDate'
                            value={this.state.eventDate}
                            placeholder='DD/MM/YYYY'
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Time (24HR)</FormLabel>
                        <Form.Row>
                            <FormGroup as={Col}>
                                <FormLabel>Start</FormLabel>
                                <FormControl 
                                    type='text'
                                    name='beginTime'
                                    value={this.state.beginTime}
                                    placeholder='00:00'
                                    onChange={this.handleChange}
                                    className='time-input'
                                />
                            </FormGroup>
                            
                            <FormGroup as={Col}>
                                <FormLabel>Finish</FormLabel>
                                <FormControl 
                                    type='text'
                                    name='endTime'
                                    value={this.state.endTime}
                                    placeholder='23:59'
                                    onChange={this.handleChange}
                                    className='time-input'
                                />
                            </FormGroup>
                        </Form.Row>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Address</FormLabel>
                        <FormControl 
                            type='text'
                            name='eventAddress'
                            value={this.state.eventAddress}
                            placeholder='Street Address, Suburb'
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Event Description</FormLabel>
                        <FormControl 
                            as='textarea'
                            rows='3'
                            name='eventDescription'
                            value={this.state.eventDescription}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        )
    }
}

export default CreateEventForm;
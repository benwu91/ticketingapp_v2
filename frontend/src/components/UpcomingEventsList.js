import React, {Component} from 'react';
import { BACKEND } from '../config';
import Event from './Event';

class UpcomingEventsList extends Component {
    state = {
        events: []
    }

    componentDidMount() {
        fetch(`${BACKEND.ADDRESS}/events`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    events: json.events
                })
            })
            .catch(error => console.error('error', error))
    }

    render() {
        return(
            <div>
                {
                    this.state.events.map(EVENT => {
                        return(
                            <Event 
                                key={EVENT.id} 
                                event={EVENT} 
                            />
                        )
                    })
                }
            </div>
        )
    }
}

export default UpcomingEventsList
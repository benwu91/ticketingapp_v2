import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { signup, login } from '../actions/account';
import fetchStates from '../reducers/fetchStates';

class AuthForm extends Component {
    state = {
        username: '',
        password: '',
        buttonClicked: false
    }

    handleChange = event => {
        const{ name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    signup = () => {
        this.setState({ buttonClicked: true });
        const { username, password } = this.state;
        this.props.signup({ username, password });
    }

    login = () => {
        this.setState({ buttonClicked: true });
        const { username, password } = this.state;
        this.props.login({ username, password });
    }

    get Error() {
        if (this.props.account.status === fetchStates.error) {
            return <div>{this.props.account.message}</div>
        }
    }

    render() {
        return (
            <div>
                <h2>Ticketing App</h2>
                <FormGroup>
                    <FormControl 
                        type='text'
                        name='username'
                        value={this.state.username}
                        placeholder='username'
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl 
                        type='password'
                        name='password'
                        value={this.state.password}
                        placeholder='password'
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <div>
                    <Button onClick={this.login}>Log In</Button>
                    <span> or </span>
                    <Button onClick={this.signup}>Sign Up</Button>
                </div>
                <br />
                {this.state.buttonClicked && this.Error}
            </div>
        )
    }
}

export default connect(
    ({ account }) => ({ account }),
    { signup, login }
)(AuthForm);
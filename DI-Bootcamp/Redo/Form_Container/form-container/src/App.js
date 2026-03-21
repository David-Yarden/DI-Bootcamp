import React, { Component } from 'react';
import FormComponent from './components/FormComponent';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      destination: '',
      nutsFree: false,
      lactoseFree: false,
      vegan: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value, type, checked } = e.target;
    this.setState({
      [name]: type === 'checkbox' ? (checked ? 'on' : 'off') : value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { firstName, lastName, age, gender, destination, nutsFree, lactoseFree, vegan } = this.state;
    const params = new URLSearchParams();
    if (firstName) params.set('firstName', firstName);
    if (lastName) params.set('lastName', lastName);
    if (age) params.set('age', age);
    if (gender) params.set('gender', gender);
    if (destination) params.set('destination', destination);
    if (nutsFree === 'on') params.set('nutsFree', 'on');
    if (lactoseFree === 'on') params.set('lactoseFree', 'on');
    if (vegan === 'on') params.set('vegan', 'on');
    window.location.href = `/?${params.toString()}`;
  }

  render() {
    return (
      <FormComponent
        data={this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default App;

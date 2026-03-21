import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: '',
      inputValue: '',
      serverResponse: '',
    };
  }

  // Part I — fetch greeting on mount
  async componentDidMount() {
    const res = await fetch('/api/hello');
    const data = await res.json();
    this.setState({ greeting: data.message });
  }

  // Part II — POST input to server
  handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/world', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ post: this.state.inputValue }),
    });
    const data = await res.json();
    this.setState({ serverResponse: data.message });
  };

  render() {
    return (
      <div className="app-container">
        {/* Part I — display greeting from Express */}
        <p>{this.state.greeting}</p>

        {/* Part II — form */}
        <h2>Post to Server:</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={(e) => this.setState({ inputValue: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>

        {/* Response from server */}
        {this.state.serverResponse && (
          <p className="response">{this.state.serverResponse}</p>
        )}
      </div>
    );
  }
}

export default App;

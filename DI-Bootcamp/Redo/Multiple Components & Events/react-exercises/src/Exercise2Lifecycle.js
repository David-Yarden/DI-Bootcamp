import React, { Component } from 'react';

// ── Exercise 3: Child (Header) component — uses componentWillUnmount ──────────
class Header extends Component {
  componentWillUnmount() {
    alert('The component named Header is about to be unmounted.');
  }

  render() {
    return <h1>Hello World!</h1>;
  }
}

// ── Exercise 2 & 3 combined: Lifecycle class component ────────────────────────
class LifecycleDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteColor: 'red',
      show: true,
    };
  }

  // Part I: shouldComponentUpdate
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    return true;
  }

  // Part II: componentDidUpdate
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('after update');
  }

  // Part II: timer changes color to yellow after mount
  componentDidMount() {
    setTimeout(() => {
      this.setState({ favoriteColor: 'yellow' });
    }, 1000);
  }

  // Part III: getSnapshotBeforeUpdate
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('in getSnapshotBeforeUpdate');
    return null;
  }

  // Exercise 3: hide the Header child
  deleteHeader = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div>
        {/* Exercise 2 output */}
        <p>
          My Favorite Color is <b>{this.state.favoriteColor}</b>
        </p>

        {/* Exercise 3 output */}
        {this.state.show && <Header />}
        <button onClick={this.deleteHeader}>Delete Header</button>
      </div>
    );
  }
}

export default LifecycleDemo;

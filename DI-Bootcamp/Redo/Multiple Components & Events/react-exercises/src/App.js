import React, { Component } from 'react';
import ErrorBoundary from './ErrorBoundary';
import LifecycleDemo from './Exercise2Lifecycle';

// ── Exercise 1: BuggyCounter ──────────────────────────────────────────────────
class BuggyCounter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({ counter }) => ({ counter: counter + 1 }));
  }

  render() {
    if (this.state.counter === 5) {
      throw new Error('I crashed!');
    }
    return (
      <h1 onClick={this.handleClick} style={{ cursor: 'pointer' }}>
        {this.state.counter}
      </h1>
    );
  }
}

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  return (
    <div style={{ padding: '20px' }}>

      {/* ── Exercise 1 ─────────────────────────────────────────────────────── */}
      <p>
        Click on the numbers to increase the counters.
        <br />
        The counter is programmed to throw error when it reaches 5. This simulates a JavaScript
        error in a component.
      </p>
      <hr />

      {/* Simulation 1: two BuggyCounters inside ONE ErrorBoundary */}
      <ErrorBoundary>
        <BuggyCounter />
        <BuggyCounter />
      </ErrorBoundary>
      <hr />

      {/* Simulation 2: each BuggyCounter in its OWN ErrorBoundary */}
      <p>These two counters are each inside of their own error boundary. So if one crashes, the other is not affected.</p>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
      <hr />

      {/* Simulation 3: BuggyCounter with NO ErrorBoundary */}
      <p>This counter is not inside of boundary. So if crashes, all other components are deleted.</p>
      <BuggyCounter />
      <hr />

      {/* ── Exercise 2 & 3: Lifecycle ──────────────────────────────────────── */}
      <LifecycleDemo />

    </div>
  );
}

export default App;

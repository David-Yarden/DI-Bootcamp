import React from "react";

class App extends React.Component {
  state = { message: "", post: "", response: "" };

  async componentDidMount() {
    const res = await fetch("/api/hello");
    const text = await res.text();
    this.setState({ message: text });
  }

  handleChange = (e) => this.setState({ post: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/world", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post: this.state.post })
    });
    const text = await res.text();
    this.setState({ response: text });
  };

  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>

        <form onSubmit={this.handleSubmit}>
          <input value={this.state.post} onChange={this.handleChange} />
          <button type="submit">Send</button>
        </form>

        <p>{this.state.response}</p>
      </div>
    );
  }
}

export default App;

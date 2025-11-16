import React, { Component } from 'react';

class CounterClass extends Component {
constructor(props) {
    super(props);
    this.state = {
        count: 0,
        input: 'props.aaa',
    };
 }
 increment = () => {
    
    this.setState({ count: this.state.count + 1 });
 }
    render() {
        console.log(this.props);
        return (
            <>
                <h1>{this.state.input}</h1>
                <h2>Count = {this.state.count}</h2>
                <button onClick={()=>this.increment()}>+</button>  
            </>
        );
    }
}

export default CounterClass;

class Parent {
    constructor(name,id) {
    }       
}

class Child extends Parent {
    constructor(id) {
        super('john', id);
    }
}
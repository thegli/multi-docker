import React, { Component } from 'react';
import Axios from 'axios';

class Fib extends Component {
  state = {
    seenIndicies: [],
    values: {},
    index: ''
  };

  componentDidMount() {
      this.fetchValues();
      this.fetchIndicies();
  }

  async fetchValues() {
    const values = await Axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndicies() {
    const seenIndicies = await Axios.get('/api/values/all');
    this.setState({ seenIndicies: seenIndicies.data });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    await Axios.post('/api/values', {
      index: this.state.index
    });
    this.setState({ index: '' });
  };

  renderSeenIndicies() {
    return this.state.seenIndicies.map(({ number }) => number).join(', ');
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} the calculated number is {this.state.values[key]};
        </div>
      );
    }

    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter index: </label>
          <input
            value={this.state.index}
            onChange={event => this.setState({ index: event.target.value })}
          /> 
          <button>Calculate</button>
        </form>

        <h3>Visited Indicies</h3>
        {this.renderSeenIndicies()}

        <h3>Calculated Fib numbers</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;

import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 50
    }
  }

  componentDidMount() {
    // this.setState({
    //   count: this.state.count - 1
    // })
    this.state.count = 49;
  }

  componentDidUpdate() {
    var self = this;
    setTimeout(function() {
      if (self.state.count === 0) {
        self.state.count = 51;
      }
      self.setState({
        count: self.state.count -1
      })
    }, 1000);
    this.state.count = self.state.count;
  }

  render() {
    return (
      <div>
        <div id="clock">
          <p>{this.state.count}</p>
        </div>
      </div>
    )
  }
}

export default Clock;

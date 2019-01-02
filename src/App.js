import React, { Component } from 'react';
import Canvas from './Components/canvas' //breaks convention temporarily
import Chat from './Components/Chat'
import Clock from './Components/Clock'
import PopUpForm from './Components/PopUpForm'
import DrawWord from './Components/DrawWord'
import Players from './Components/Players'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    }
  }

  render() {
      return (
          <div>
            <PopUpForm handleSubmit = {(name) => {this.setState({
              userName: name
            })}}/>
            <div id="container">
            <h3>Welcome to Fast Draw</h3>
              <div id="main">
              <Players/>
                <div id="inner-main">
                  <Clock/>
                  <Canvas />
                  <Chat senderId={this.state.userName}/>
                </div>
                <DrawWord/>
              </div>
            </div>
          </div>
        );
  }
}

export default App;

import React, { Component } from 'react';

const hidden = {
  display: 'none'
}

class PopUpForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      senderId: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {handleSubmit} = this.props;
    if (this.input.value === "") {
      document.querySelector("#popup-error").style.display = "block";
      return;
    }
    this.setState({
      senderId: this.input.value
    });
    document.querySelector("#popUpForm").style.display = "none";
    document.querySelector("#container").style.pointerEvents = "auto";
    document.querySelector("#container").style.opacity = "1";
    return <div>{handleSubmit(this.input.value)}</div>
  }

  render() {
    return(
      <div id="popUpForm">
        <form onSubmit={this.handleSubmit}>
          <h4>Sign In</h4>
          <label htmlFor="nickname">Enter nickname: </label>
          <input id="nickname" type="text" ref={(input) => this.input = input} maxLength="15"/>
          <div>
            <p style={hidden} id="popup-error" className="error-msg">* Please enter a nickname</p>
          </div>
          <div className="submit-btn-container">
            <input id="submit-name" type="submit" value="Enter"/>
          </div>
        </form>
      </div>
    )
  }
}

export default PopUpForm;

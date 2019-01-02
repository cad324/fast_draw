import React, { Component } from 'react';
import Slider, { Range } from 'rc-slider';

// import 'rc-slider/assets/index.css';

class DrawTools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pencil: 'disabled',
      eraser: 'disabled'
    }
    this.activeTool = this.activeTool.bind(this);
    this.refreshCanvas = this.refreshCanvas.bind(this);
  }

  activeTool = (pencil, eraser) => {
    const {activeTool} = this.props;
    return <div>{activeTool(this.state.pencil, this.state.eraser)}</div>
  }

  refreshCanvas = () => {
    const {refreshCanvas} = this.props;
    return <div>{refreshCanvas()}</div>
  }

  componentDidMount() {
    var self = this;
    document.getElementById("eraser-tool").addEventListener("click", function() {
      self.setState({
        pencil: 'disabled',
        eraser: 'enabled'
      })
      this.state = self.state;
    });
    document.getElementById("pencil-tool").addEventListener("click", function() {
      self.setState({
        pencil: 'enabled',
        eraser: 'disabled'
      })
      this.state = self.state;
    })
  }

  render() {
    return (
      <span id="tool-kit">
        <img id="eraser-tool" src="https://s3.amazonaws.com/fast-draw/eraser_cursor.png" alt="eraser tool" onClick={this.activeTool} />
        <img id="pencil-tool" src="https://s3.amazonaws.com/fast-draw/pencil_icon.png" alt="pencil tool" onClick={this.activeTool}/>
        <img id="refresh-canvas" src="https://s3.amazonaws.com/fast-draw/reload.png" alt="Refresh canvas" onClick={this.refreshCanvas}/>
        <Slider/>
      </span>
    )
  }
}

export default DrawTools;

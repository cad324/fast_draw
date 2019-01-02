import React, { Component } from 'react';
import DrawTools from './DrawTools'
import { v4 } from 'uuid';
import Pusher from 'pusher-js';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.endPaintEvent = this.endPaintEvent.bind(this);
    this.pusher = new Pusher('aab048502da7a534b01c', {
      cluster: 'eu',
    });
    this.state = {
      pencil: 'enabled',
      eraser: 'disabled',
      cursor: {cursor: 'auto'}
    }
  }

  isPainting = false;
  // Different stroke styles to be used for user and guest
  userStrokeStyle = '#000';
  lineWidth = 2;
  line = [];
  // v4 creates a unique id for each user. We used this since there's no auth to tell users apart
  userId = v4();
  prevPos = { offsetX: 0, offsetY: 0 };

  onMouseDown({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    this.isPainting = true;
    this.prevPos = { offsetX, offsetY };
  }

  onMouseMove({ nativeEvent }) {
    if (this.isPainting) {
      const { offsetX, offsetY } = nativeEvent;
      const offSetData = { offsetX, offsetY };
      // Set the start and stop position of the paint event.
      const positionData = {
        start: { ...this.prevPos },
        stop: { ...offSetData },
      };
      // Add the position to the line array
      this.line = this.line.concat(positionData);

      this.paint(this.prevPos, offSetData, this.userStrokeStyle);
    }
  }

  onMouseEnter({nativeEvent}) {
    if (this.state.eraser === 'enabled') {
      this.userStrokeStyle = '#fff';
      this.lineWidth = 10;
      this.setState({
        cursor: {cursor:'url(https://s3.amazonaws.com/fast-draw/eraser_cursor.png), auto'}
      });
    } else if (this.state.pencil === 'enabled') {
      this.userStrokeStyle = '#000'
      this.lineWidth = 2;
      this.setState({
        cursor: {cursor:'url(https://s3.amazonaws.com/fast-draw/pencil_icon.png), auto'}
      });
    }
  }

  endPaintEvent() {
    if (this.isPainting) {
      this.isPainting = false;
      this.sendPaintData();
    }
  }

  paint(prevPos, currPos, strokeStyle) {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos;

    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;
    // Move the the prevPosition of the mouse
    this.ctx.moveTo(x, y);
    // Draw a line to the current position of the mouse
    this.ctx.lineTo(offsetX, offsetY);
    // Visualize the line using the strokeStyle
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.stroke();
    this.prevPos = { offsetX, offsetY };
  }

  async sendPaintData() {
    const body = {
      line: this.line,
      userId: this.userId,
    };
    // We use the native fetch API to make requests to the server
    const req = await fetch('http://localhost:4000/paint', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
      },
    });
    const res = await req.json();
    console.log(res);
    this.line = [];
  }

  componentDidMount() {
    // Here we set up the properties of the canvas element.
    this.canvas.width = 600;
    this.canvas.height = 500;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 2;
    const channel = this.pusher.subscribe('painting');
    channel.bind('draw', (data) => {
      const { userId, line } = data;
      if (userId !== this.userId) {
        line.forEach((position) => {
          this.paint(position.start, position.stop, this.userStrokeStyle);
        });
      }
    });
  }

  render() {
    return (
      <span>
        <DrawTools activeTool = {(pencil, eraser) => {
          this.setState({
            pencil: pencil,
            eraser: eraser
          })
        }} refreshCanvas = {() => {
          this.ctx.clearRect(0, 0, 600, 5000);
        }} />
        <canvas id="canvas"
        // We use the ref attribute to get direct access to the canvas element.
          ref={(ref) => (this.canvas = ref)}
          onMouseDown={this.onMouseDown}
          onMouseLeave={this.endPaintEvent}
          onMouseUp={this.endPaintEvent}
          onMouseMove={this.onMouseMove}
          onMouseEnter={this.onMouseEnter}
          style={this.state.cursor}
        />
      </span>
    );
  }
}

export default Canvas;

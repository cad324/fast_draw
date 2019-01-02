import React, { Component } from 'react';

class DrawWord extends Component {

  componentDidMount() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        var wordArray = xhttp.responseText.split("\n");
        var randomWordIndex = Math.floor(Math.random() * 2023);
        document.getElementById("word-to-guess").innerHTML = wordArray[randomWordIndex];
      }
    };
    xhttp.open("GET", "https://s3.amazonaws.com/fast-draw/word-list.txt", true);
    xhttp.send();
  }

  render() {
    return(
      <div id="draw-word-section">
        <span>Your word: </span>
        <span id="word-to-guess">[SOME WORD]</span>
      </div>
    )
  }

}

export default DrawWord;

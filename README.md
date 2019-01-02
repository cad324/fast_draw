
# Fast Draw - In Development
**A draw and guess game built using the ReactJS library**

The game is being developed using the MongoDB, Express, React & Node.js (MERN) stack.

## Gameplay

Each player must submit a user name before entering the game.

Then, each player takes turns drawing an image of a given word for which the other players have 50 seconds to guess - the clock in the top right corner of the canvas monitors the time.

If a player guesses the word correctly by typing it exactly into the chat, he/she would be rewarded 3 points and the drawer would be rewarded 1 point.

The game continues until a player gets to 10 points.

![](https://github.com/cad324/fast_draw/blob/master/documents/content/game_basic_ui.PNG)

## Status

The UI for the game is set up using ReactJS, and the chat is served up by MongoDB and makes use of socket.io.

A few chat and draw synching bugs are left to be fixed as well as the scoring component to be implemented before the React web app (game) is complete.

## Usage

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `node server`

Runs the server side script for synching the chat and canvas drawing.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

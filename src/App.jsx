import React from 'react';
import update from 'immutability-helper';

import WelcomePage from './components/WelcomePage.jsx';
import GamePage from './components/GamePage.jsx';

import {
  makeEmptyGameField, makeStep, isCellTaken, isGameOver, isTie,
} from './gameActions';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormFilled: false,
      isGameStarted: false,
      players: {
        playerX: { name: '', sign: '×', score: 0 },
        playerO: { name: '', sign: '○', score: 0 },
      },
      fieldSize: 3,
      gameField: [],
      activePlayer: 'playerX',
      movesCounter: 0,
      gameResult: null,
      winner: null,
    };
  }

  checkIfFilled = (players) => {
    const { name: playerXName } = players.playerX;
    const { name: playerOName } = players.playerO;
    return playerXName !== '' && playerOName !== '';
  }

  handleNameInput = player => ({ target: { value } }) => {
    const oldPlayers = this.state.players;
    const newPlayers = update(oldPlayers, { [player]: { name: { $set: value } } });
    const isFormFilled = this.checkIfFilled(newPlayers);
    this.setState({ players: newPlayers, isFormFilled });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { fieldSize } = this.state;
    const gameField = makeEmptyGameField(fieldSize);
    this.setState({ isGameStarted: true, gameField });
  }

  handleCellClick = (row, cell) => () => {
    const {
      gameField, activePlayer, players, fieldSize, movesCounter, gameResult,
    } = this.state;

    if (gameResult) {
      return;
    }

    if (isCellTaken(row, cell, gameField)) {
      return;
    }

    const signToPut = players[activePlayer].sign;
    const updatedField = makeStep(row, cell, gameField, signToPut);

    const getNextActivePlayer = (currentActivePlayer) => {
      const nextActivePlayer = {
        playerX: 'playerO',
        playerO: 'playerX',
      };
      return nextActivePlayer[currentActivePlayer];
    };
    const nextActivePlayer = getNextActivePlayer(activePlayer);
    this.setState(
      { gameField: updatedField, activePlayer: nextActivePlayer, movesCounter: movesCounter + 1 },
    );

    if (isGameOver(gameField, fieldSize, signToPut)) {
      const winner = activePlayer;
      const oldScore = players[winner].score;

      const updatedPlayers = update(players, { [winner]: { score: { $set: oldScore + 1 } } });
      this.setState({ gameResult: 'win', winner, players: updatedPlayers });
    }
  }

  componentDidUpdate() {
    const { movesCounter, gameResult, fieldSize } = this.state;
    if (isTie(movesCounter, fieldSize) && !gameResult) {
      this.setState({ gameResult: 'tie' });
    }
  }

  handleResetButtonClick = () => {
    const { fieldSize } = this.state;
    const emptyField = makeEmptyGameField(fieldSize);

    this.setState({
      gameField: emptyField,
      winner: null,
      gameResult: null,
      movesCounter: 0,
    });
  }

  renderWelcomePage() {
    const { players, isFormFilled } = this.state;
    const { name: playerXName } = players.playerX;
    const { name: playerOName } = players.playerO;

    return (
      <WelcomePage
        onChange={this.handleNameInput}
        playerX={playerXName}
        playerO={playerOName}
        onSubmit={this.handleSubmit}
        isFormFilled={isFormFilled}
      />
    );
  }

  renderGamePage() {
    const {
      gameField, players, activePlayer, gameResult, winner,
    } = this.state;
    return (
      <GamePage
        gameField={gameField}
        onCellClick={this.handleCellClick}
        activePlayer={activePlayer}
        players={players}
        result={gameResult}
        winner={winner}
        onResetClick={this.handleResetButtonClick}
      />
    );
  }

  render() {
    const { isGameStarted } = this.state;
    return (
      <div className="App container-fluid">
        {isGameStarted ? this.renderGamePage() : this.renderWelcomePage()}
      </div>
    );
  }
}

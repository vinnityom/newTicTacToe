import React from 'react';
import classNames from 'classnames';

const GameField = ({ field, onCellClick }) => {
	return field.map((row, rowIndex) => <tr key={`row-${rowIndex}`}>{row.map((cell, cellIndex) =>
		<td key={`cell-${cellIndex}`} onClick={onCellClick(rowIndex, cellIndex)} className="p-3 text-center" width="100" height="100">{cell}</td>)}</tr>);
};

const ScoreBoard = ({ players: { playerO, playerX }, activePlayer }) => {
	const playerXClassNames = classNames({
		'list-group-item': true,
		active: activePlayer === 'playerX',
	});
	const playerOClassNames = classNames({
		'list-group-item': true,
		active: activePlayer === 'playerO',
	});
	return (
		<ul id="players" className="list-group">
			<li id="playerX" className={playerXClassNames}>{`${playerX.sign} ${playerX.name} - ${playerX.score}`}</li>
			<li id="playerO" className={playerOClassNames}>{`${playerO.sign} ${playerO.name} - ${playerO.score}`}</li>
		</ul>
	);
};

const Alert = ({ result, winner, players, onClick }) => {
	const messages = {
		win: (players, winner) => `Congratulations, ${players[winner].name}`,
		tie: () => 'Seems like it is a tie!',
	}
	return (
		<div className="alert alert-secondary" role="alert" id="alert">
			{messages[result](players, winner)}
			<button onClick={onClick} type="button" className="btn btn-light btn-sm">Play again</button>
		</div>
	);
};

export default class GamePage extends React.Component {
  render() {
		const {
			gameField, onCellClick, onResetClick, activePlayer, players, result, winner,
		} = this.props;
		return (
			<div className="row" id="game-page">
				<div id="game-field" className="col-sm-8">
					<table id="field-table" className="table-bordered" bgcolor="white">
						<tbody>
							<GameField field={gameField} onCellClick={onCellClick} />
						</tbody>
					</table>
				</div>
				<div className="col-sm-4">
					<ScoreBoard players={players} activePlayer={activePlayer} />
				</div>
				{result && <Alert onClick={onResetClick} result={result} winner={winner} players={players} />}
			</div>
		)
	}
}
import React from 'react';
import classNames from 'classnames';

export default class WelcomePage extends React.Component {
  render() {
    const { onChange, playerX, playerO, onSubmit, isFormFilled } = this.props;
    const buttonClassNames = classNames({
      btn: true,
      'btn-outline-primary': true,
      'btn-lg': true,
      'btn-block': true,
      disabled: !isFormFilled,
    })
		return (
      <div id="welcome-page">
        <h1 className="display-4 text-center">Welcome to the great game of Tic Tac Toe!</h1>
        <form onSubmit={onSubmit}>
          <div id="nameInputs" className="row">
            <div className="col-sm-5 input-group mb-2">
              <div className="input-group-prepend">
                  <div className="input-group-text">×</div>
              </div>
              <input
                id="playerX"
                className="form-control form-control-lg border"
                type="text"
                placeholder="name"
                onChange={onChange('playerX')}
                value={playerX}
              />
            </div>
            <div className="col-sm-5 input-group mb-2">
              <div className="input-group-prepend">
                  <div className="input-group-text">○</div>
              </div>
              <input
                id="playerO"
                className="form-control form-control-lg border"
                type="text"
                placeholder="name"
                onChange={onChange('playerO')}
                value={playerO}
              />
            </div>
            <div className="col-sm-2">
              <button id="beginButton" disabled={!isFormFilled} type="submit" className={buttonClassNames}>Begin</button>
            </div>
          </div>
        </form>
      </div>
    );
	}
}
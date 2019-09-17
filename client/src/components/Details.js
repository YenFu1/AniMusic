import React, { Component } from 'react';

export default class Details extends Component {

  render() {
    let answerText = this.props.isGuessingPhase ? '' : this.props.source;
    let players = this.props.players ? this.props.players : {};
    let details = this.props.isGuessingPhase ? '' :

      <ul>
        <li>Title:</li>
        <li><p>{this.props.title}</p></li>
        <li>Artist:</li>
        <li><p>{this.props.artist}</p></li>
        <li>Type:</li>
        <li><p>{this.props.type}</p></li>
        <li><a href={`https://openings.moe/video/${this.props.filepath}.mp4`}>source</a></li>
      </ul>

    return (
      <div className="wrapper game">
        <h1>{answerText}</h1>
        <table className="leaderboard">
          <tbody>
            <tr>
              <th>Leaderboard</th>
            </tr>
              {Object.keys(players).map(key => (
                <tr>
                  <td>{players[key].username}</td>
                  <td>{players[key].score}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="details">
          {details}
        </div>
      </div>
    )
  }
}
import React, { Component } from 'react';
import { Socket } from 'dgram';

export default class VideoPlayer extends Component {
    constructor(props) {
      super(props);
        this.state = ({
            input: '',
            isAnswerCorrect: false,
            isInputActive: false,
        });
    }

    componentDidUpdate() {
        if (!this.props.isGuessingPhase && this.state.input !== '') {
            this.setState({ input: '' })
        }
    }

    updateInput = (e) => {
        this.setState({ input: e.target.value, });
    }

    autocompleteInput = (e) => {
        this.setState({ input: e.target.innerHTML, });
    }

    setInputActive = () => {
        this.setState({ isInputActive: true, });
    }
    
    setInputInactive = () => {
        setTimeout(() => {
            this.setState({ isInputActive: false, });
        }, 100);
    }

    submitAnswer = async (e) => {
        e.preventDefault();
        await this.props.handler(this.state.input === this.props.answer &&
            this.props.isGuessingPhase,);
        }

    getSuggestions() {
        let suggestions = [];
        let shows = this.props.shows ? this.props.shows : [];
        for (let show of shows) {
            if (show.toLowerCase().startsWith(this.state.input.toLowerCase()) &&
                this.state.input.length > 2) {
                suggestions.push(show);
            }
        }
        return this.state.isInputActive ? suggestions: [];
    }

    render() {
        let SuggestionsList = (
            <div className="suggestions">
                <ul>
                    {this.getSuggestions().map((show) => (
                        <li onClick={this.autocompleteInput}>{show}</li>
                    ))}
                </ul> 
        </div>)
        return (
            <div>
                <form className="input" onSubmit={this.submitAnswer}>
                    <input id="search" type="text" autoComplete="off" 
                        placeholder="Guess the show this is from" name="answer"
                        value={this.state.input}
                        onChange={this.updateInput} onFocus={this.setInputActive}
                        onBlur={this.setInputInactive}>
                    </input>
                </form>
                    {SuggestionsList}
            </div>

        )
    }
}
import React, { Component } from 'react';

class TypeInTime extends Component {

    constructor(props) {
        super(props);
        this.state = {
            words: [ "rapid", "roll", "skate", "time", "happy", "exclaim", "tired", "rest" ],
            randomWord: "rapid",
            typedWord: "",
            time: 5,
            score: 0,
            mistyped: 0,
            timerId: null
        };
        this.randomWordGen = this.randomWordGen.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setTimer = this.setTimer.bind(this);
    }

    randomWordGen() {
        const num = Math.floor(Math.random() * this.state.words.length);
        this.setState({
            randomWord: this.state.words[num],
            typedWord: "",
            time: 5
        })
    }

    setTimer() {
        console.log("setTimer")
        const id = setInterval(() => {

            console.log(this.state.time);
            if(this.state.time > 0) {
                this.setState((prevState) => {
                    return {
                        time: prevState.time - 1
                    }
                })
            }
            
            if(this.state.time === 0) {
                clearInterval(id);
                console.log("cleared");
                this.setState((prevState) => {
                    return {
                        typedWord: "",
                        // time: 5,
                        // score: -1,
                        // mistyped: 0
                    }
                });
            }

        }, 1000);
        this.setState({
            timerId: id,
        })
    }

    handleChange(e) {
        this.setState({
            typedWord: e.target.value
        }, () => {
            const { randomWord, typedWord } = this.state;
            if (randomWord.startsWith(typedWord) && typedWord.length === randomWord.length && this.state.time === 0) {
                console.log("I am here")
                this.setState({
                    score: 0,
                    mistyped: 0,
                    time: 5
                })
                this.randomWordGen();
                this.setTimer();
            } else if(randomWord.startsWith(typedWord) && typedWord.length === randomWord.length) {
                // console.log("Entered Correct Text");
                this.setState({score: this.state.score + 1})
                clearInterval(this.state.timerId);
                console.log("clear from correct entry");
                this.randomWordGen();
                this.setTimer();
            } else if (!randomWord.startsWith(typedWord) && typedWord.length === randomWord.length) {
                // console.log("Incorrect");
                this.setState({
                    mistyped: this.state.mistyped + 1
                })
            } 
        });

    }

    render() {
        return (
            <div>
                <header>
                    <h1>Type in Time</h1>
                </header>
                <h1>{this.state.randomWord}</h1>
                <input type="text" value={this.state.typedWord} onChange={this.handleChange} onFocus={this.setTimer} maxLength={this.state.randomWord.length} />
                <div>
                    <p>Time left: {this.state.time}</p>
                    <p>Score: {this.state.score}</p>
                    <p>Mistyped: {this.state.mistyped}</p>
                </div>
            </div>
        )
    }
}

export default TimeInTime;
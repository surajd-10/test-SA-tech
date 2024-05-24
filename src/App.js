import React, { Component } from "react";
import {QUESTIONS} from "./questions";
import Question from "./components/Question";
import Storage from "./utils/storage";
import {STORAGE_KEY_SCORE} from "./constant";
import "./App.css";

class App extends Component {
  state = {
    numberOfYesAnswers: {}
  };

  componentDidMount(){
    window.addEventListener("beforeunload", this.unloadHandler);

  }

  componentWillUnmount(){
    window.removeEventListener("beforeunload", this.unloadHandler);
  }

  unloadHandler=()=>{
    const score = Storage.get(STORAGE_KEY_SCORE, []);
    score.push(this.calculateScore())
    Storage.save(STORAGE_KEY_SCORE, score);
  }

  handleYesButtonClick=(key)=>{
    this.setState(prev => ({...prev, numberOfYesAnswers: {...prev.numberOfYesAnswers,[key]: true}}));
  }

  handleNoButtonClick=(key)=>{
    const numberOfYesAnswers = {...this.state.numberOfYesAnswers};
    delete numberOfYesAnswers[key];
    this.setState({numberOfYesAnswers})
  }

  calculateScore=()=>{
    return 100 * Object.keys(this.state.numberOfYesAnswers).length/ Object.keys(QUESTIONS).length;
  }

  calculateAverageRating=()=>{
    const score = Storage.get(STORAGE_KEY_SCORE, []);
      if(score.length === 0) return 0;
      const sum = score.reduce((acc, current)=>{
        acc+=current;
        return acc;
      },0);
      return (sum/score.length).toFixed(2);
  }


  render() {
    return (
      <div className="main__wrap">
        <main className="container">
          <div className="questionsContainer">
            {
              Object.keys(QUESTIONS).map((key)=>{
                return <Question key={key} question={QUESTIONS[key]} handleYesButtonClick={()=>this.handleYesButtonClick(key)} handleNoButtonClick={()=>this.handleNoButtonClick(key)}/>
              })
            }
          </div>
          <div className="scoreContainer">
            <p>Score: {this.calculateScore()}</p>
          </div>
          <div className="avgRatingContainer">
            <p>Average Rating: {this.calculateAverageRating()}</p>
          </div>
        </main>
      </div>
    );
  }
}

export default App;

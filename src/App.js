import "./App.css";
import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import axi from "./data";

class App extends Component {
  
  state = {
    photosArr: [],
    score: 0,
    topScore: 0
  };

  componentDidMount() {
    axi.then(data => {
        this.setState({
          photosArr: data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  incrementScore = () => {
    this.setState({
      score: this.state.score + 1,
      topScore: this.state.topScore + 1
    });
    this.shuffleCards();
  }

  resetScore = () => {
    this.setState({
      score: 0
    });
    this.shuffleCards();
  }

  shuffleCards = () => {
    this.setState({
      photosArr: this.shuffleArr(this.state.photosArr)
    });
  };

  shuffleArr(arr) {
    var j, x, i;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }
    return arr;
}

  render() {
    return (
      <div>
        <nav></nav>
        <div className="container">
          <Wrapper>
            <div className="title">
                <h1>Score: {this.state.score}</h1>
                <h1>Top score: {this.state.topScore}</h1>
            </div>
            {this.state.photosArr.map(photo => (
              <Card
                key={photo.id}
                id={photo.id}
                photoURL={photo.links.download}
                incrementScore={this.incrementScore}
                resetScore={this.resetScore}
              />
            ))}
          </Wrapper>
        </div>
      </div>
    );
  }
}

export default App;

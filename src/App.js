import React, { Component } from 'react';
import './App.css';
import Login from './components/login.jsx';
import TrainingSelection from './components/TrainingSelection.jsx';
import TrainedPage from './components/isTrainedPage.jsx';
import TestingPage from './components/TestingPage.jsx';
// import {BrowserRouter, Route, Link, Switch} from "react-router-dom";
import axios from 'axios';
import queryString from 'query-string';

// var data = require('./assets/js/fakedata.json');

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {},
      playlists: [],
      trained: false,
      testing: false,
      token: ''
    }
    this.loginToSpotify = this.loginToSpotify.bind(this);
    this.nowTrained = this.nowTrained.bind(this);
    this.deleteModel = this.deleteModel.bind(this);
    this.startTesting = this.startTesting.bind(this);
    this.stopTesting = this.stopTesting.bind(this);
  }

  loginToSpotify() {
    window.location="http://localhost:8888/login"
  }

  nowTrained() {
    this.setState(
      {
        trained: true
      }
    )
  }

  deleteModel() {
    //axios call to remove the model from the DB

    axios.get(
      'http://localhost:4000/delete/' + this.state.user.id)
      .then(res => {
        console.log(res.data)
      });

    this.setState(
      {
        trained: false
      }
    )
  }

  startTesting() {
    this.setState(
      {
        testing: true
      }
    )
  }
  stopTesting() {
    this.setState(
      {
        testing: false
      }
    )
  }

  async componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    this.setState( {
      token: accessToken
    })

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json()).then(data => {
        this.setState( {
          user: data
        });

        axios.get(
          'http://localhost:4000/models/' + data.id)
          .then(res => {
            res.data.result && this.nowTrained();
            console.log("res.data:" ,res.data)
          });
      }
    )

    let getPlaylists_response = await
      fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {'Authorization': 'Bearer ' + accessToken}
      });

    let getPlaylists_json = await getPlaylists_response.json();
    // console.log("getPlaylists_response", getPlaylists_response)
    // console.log("getPlaylists_json", getPlaylists_json)

    var arrOfPlaylists = getPlaylists_json.items;
    console.log("arrOfPlaylists", arrOfPlaylists)
    this.setState({playlists: arrOfPlaylists});

    // fetch('https://api.spotify.com/v1/me/playlists', {
    //   headers: {'Authorization': 'Bearer ' + accessToken}
    // }).then(response => response.json()).then( data => {
    //     console.log("Data!!!!!!!!!!!!!!!", data);
    //     let arrOfPlaylists = data.items.map(item => {
    //       return item;
    //     });
    //     console.log("arrOfPlaylists@@", arrOfPlaylists);
    //     this.setState({playlists: arrOfPlaylists});
    //   }
    // )
  }

  render() {
    console.log("App.js State:", this.state)
    return (
      <div className="App">
        <header className="App-header">
          { !this.state.playlists ?
            <Login handleLogin={this.loginToSpotify} user={this.state.user}/>
            :
            (!this.state.trained ?
              <div>
                Hi {this.state.user.display_name}! Please train a model.
                <TrainingSelection
                  playlists={this.state.playlists}
                  trained={this.nowTrained}
                  token={this.state.token}
                  user={this.state.user.id}
                />
              </div>
              :
              <div>
                {this.state.testing ?
                <TestingPage
                  stopTesting={this.stopTesting}
                  token={this.state.token}
                  user={this.state.user.id}
                />

                :
                <div>
                  Hey {this.state.user.id}! Your model is trained!
                  <TrainedPage
                    handleDelete={this.deleteModel}
                    nowTesting={this.startTesting}/>
                </div>
                }
              </div>
            )
          }
        </header>
      </div>
    );
  }
}

export default App;

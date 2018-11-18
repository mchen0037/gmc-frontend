import React, { Component } from 'react';
import './App.css';
import Login from './components/login.jsx';
import TrainingSelection from './components/TrainingSelection.jsx';
import TrainedPage from './components/isTrainedPage.jsx';
import TestingPage from './components/TestingPage.jsx';
// import {BrowserRouter, Route, Link, Switch} from "react-router-dom";
// import axios from 'axios';
import queryString from 'query-string';

// var data = require('./assets/js/fakedata.json');

//From https://api.spotify.com/v1/me
// https://api.spotify.com/v1/me/playlists
let userInfoFromServer = {
  user: {
    display_name: 'yoboimightychen',
    id: 'some_id_string',
  },
  playlists: [
    {
      id: 'some_playlist_id1',
      name: "Twenty One Pilots Songs",
      tracks: [
        {
          name: 'song 1',
          duration: 1000
        },
        {
          name: 'song 2',
          duration: 2000
        }
      ]
    },
    {
      id: 'some_playlist_id2',
      name: "Top Country Songs",
      tracks: [
        {
          name: 'song 3',
          duration: 3000
        },
        {
          name: 'song 4',
          duration: 4000
        }
      ]
    },
    {
      id: 'some_playlist_id3',
      name: "My Mixtape",
      tracks: [
        {
          name: 'song 5',
          duration: 3000
        },
        {
          name: 'song 6',
          duration: 4000
        },
        {
          name: 'song 7',
          duration: 5000
        }
      ]
    }
  ]
};


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

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json()).then(data =>
      this.setState( {
        user: data
      })
    )

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json()).then( data => {
        let arrOfPlaylists = data.items.map(item => {
          return item;
        })
        this.setState({playlists: arrOfPlaylists})
        console.log(arrOfPlaylists)
      }
    )
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">

        <header className="App-header">
          { !this.state.playlists[0] ?
            <Login handleLogin={this.loginToSpotify} user={this.state.user}/>
            :
            (!this.state.trained ?
              <div>
                Hi {this.state.user.id}! Please train a model.
                <TrainingSelection
                  playlists={this.state.playlists}
                  trained={this.nowTrained}
                />
              </div>
              :
              <div>
                {this.state.testing ?
                <TestingPage stopTesting={this.stopTesting}/>

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

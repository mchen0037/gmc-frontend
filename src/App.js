import React, { Component } from 'react';
import './App.css';
import Login from './components/login.jsx';
import TrainingSelection from './components/TrainingSelection.jsx';
import TrainedPage from './components/isTrainedPage.jsx';
import TestingPage from './components/TestingPage.jsx';

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
      playlists: {},
      trained: true,
      testing: false
    }
    this.login = this.login.bind(this);
    this.nowTrained = this.nowTrained.bind(this);
    this.deleteModel = this.deleteModel.bind(this);
    this.startTesting = this.startTesting.bind(this);
    this.stopTesting = this.stopTesting.bind(this);
  }

  login() {
    this.setState(
      {
        user: userInfoFromServer.user,
        playlists: userInfoFromServer.playlists
      });
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

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
          { !this.state.user.display_name ?
            <Login handleLogin={this.login} user={this.state.user}/>
            :

            (!this.state.trained ?
              <div>
                Welcome, {this.state.user.display_name}!
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
                  hey {this.state.user.display_name}! Your model is trained!
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

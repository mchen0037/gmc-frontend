import React, { Component } from 'react';
import './App.css';
import Login from './components/login.jsx';
import TrainingSelection from './components/TrainingSelection.jsx';
import TrainedPage from './components/isTrainedPage.jsx';
import TestingPage from './components/TestingPage.jsx';
import axios from 'axios';
import queryString from 'query-string';


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

  //FIXME: Only switch to trained if there exists one in the DB.
  nowTrained() {
    this.setState(
      {
        trained: true
      }
    )
  }

  deleteModel() {
    axios.get(
      'http://localhost:4000/delete/' + this.state.user.id)
      .then(res => {
        // console.log(res.data)
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

    //Once I get the user info, then check if they have any models.
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
            // console.log("res.data:", res.data)
          });
      }
    )

    // Also grab the list of playlists that they have.
    let getPlaylists_response = await
      fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {'Authorization': 'Bearer ' + accessToken}
      });

    let getPlaylists_json = await getPlaylists_response.json();

    var arrOfPlaylists = getPlaylists_json.items;
    this.setState({playlists: arrOfPlaylists});
  }

  render() {
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

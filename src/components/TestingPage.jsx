import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Form from './Form.jsx';
import Results from './Results.jsx';
import axios from 'axios';

class TestingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      songs: []
    };
    this.addSongToList = this.addSongToList.bind(this);
    this.removeSong = this.removeSong.bind(this);
    this.testSongs = this.testSongs.bind(this);
  }

  addSongToList(uri) {
    var songs = this.state.songs
    songs.push({key: uri})
    this.setState( {
      songs: songs
    });
  }

  removeSong(song_key) {
    var songs = this.state.songs.filter(c => c.key !== song_key);
    this.setState( {
      songs: songs
    })
  }

  async testSongs() {
    let ids = this.state.songs.map(song => {
      return song.key.substring(14);
    })

    console.log(ids)

    let test_features_response = await
      fetch('https://api.spotify.com/v1/audio-features/?ids=' +
      ids.toString(),
      {headers: {'Authorization': 'Bearer ' + this.props.token}}
      )
    let test_features = await test_features_response.json();

    let names_response = await
      fetch('https://api.spotify.com/v1/tracks/?ids=' +
      ids.toString(),
      {headers: {'Authorization': 'Bearer ' + this.props.token}}
      )
    let names_json = await names_response.json();
    let names = names_json.tracks.map(track => {
      return track.name;
    })
    console.log("names:", names)

    var counter = -1
    axios.post(
      'http://localhost:4000/predict/' + this.props.user, {
        test: test_features.audio_features
      })
      .then( (res) => {
        let songs = res.data.results.map(result => {
          counter++;
          return {
              key: this.state.songs[counter].key,
              name: names[counter],
              result: result
            }

          // console.log(names[counter])
          // console.log("<<<<<<<<<<<<<<<<", res)

        })
        console.log(songs)
        this.setState({songs: songs})

      });

    //axios call here
    console.log("testing songs!!");
  }

  render() {
    console.log(this.state);
    return(
      <div>
        <Button
         bsStyle="default"
         className='btn btn-danger btn-sm m-2'
         onClick={this.props.stopTesting}>
          Back
        </Button>
        <Form
          addSongs={(uri) => this.addSongToList(uri)}
        />
        {this.state.songs[0] &&
          <div>
            <Results songs={this.state.songs}
            handleDeleteSong={(uri) => this.removeSong(uri)}/>
            <Button
              bsStyle="default"
              bsClass='btn btn-primary btn-sm m-2'
              onClick={this.testSongs}
              >
              Test!
            </Button>
          </div>
        }
      </div>
    )
  }
}

export default TestingPage;

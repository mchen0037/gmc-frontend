import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Form from './Form.jsx';
import Results from './Results.jsx';

class TestingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      songs: []
    };
    this.addSongToList = this.addSongToList.bind(this);
    this.removeSong = this.removeSong.bind(this);
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

  testSongs() {
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

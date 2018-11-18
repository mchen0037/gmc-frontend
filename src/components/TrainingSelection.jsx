import React, {Component} from 'react';
// import {DropdownButton, MenuItem} from 'react-bootstrap';
import DropdownMenu from './DropdownMenu.jsx';
import {Button} from 'react-bootstrap';
import axios from 'axios';
class TrainingSelection extends Component {

  constructor(props) {
    super(props)
    this.state = {
      good: '',
      // okay: false,
      bad: ''
    };
    this.handleClickGood = this.handleClickGood.bind(this);
    // this.handleClickOkay = this.handleClickOkay.bind(this);
    this.handleClickBad = this.handleClickBad.bind(this);
    this.submitTrainingSelection = this.submitTrainingSelection.bind(this);
  }


//Bad way to handle this.
  handleClickGood(playlist_name) {
    this.setState( {good: playlist_name})
  }
  // handleClickOkay(playlist_name) {
  //   this.setState( {okay: playlist_name})
  // }
  handleClickBad(playlist_name) {
    this.setState( {bad: playlist_name})
  }


  async submitTrainingSelection() {
    //get just the playlist with the good/bad name
    let good_playlist = this.props.playlists.filter(playlist => playlist.name === this.state.good)
    let bad_playlist = this.props.playlists.filter(playlist => playlist.name === this.state.bad)

    //call spoot api but wait for a response
    let good_playlist_response = await
      fetch('https://api.spotify.com/v1/playlists/' +
      good_playlist[0].id + '/tracks',
      {headers: {'Authorization': 'Bearer ' + this.props.token}
    });
    //jsonfy the playlist tracks and then get just the ids and store them into an array.
    let good_playlist_json = await good_playlist_response.json();
    let good_track_ids = good_playlist_json.items.map(item => {
      return item.track.id;
    })

    let bad_playlist_response = await
      fetch('https://api.spotify.com/v1/playlists/' +
      bad_playlist[0].id + '/tracks',
      { headers: {'Authorization': 'Bearer ' + this.props.token}
    })
    let bad_playlist_json = await bad_playlist_response.json();
    let bad_track_ids = bad_playlist_json.items.map(item => {
      return item.track.id;
    })

    // console.log(good_track_ids.toString())

    let good_audio_features_response = await
      fetch('https://api.spotify.com/v1/audio-features/?ids=' +
      good_track_ids.toString(),
      {headers: {'Authorization': 'Bearer ' + this.props.token}}
    )
    let good_audio_features = await good_audio_features_response.json();

    let bad_audio_features_response = await
      fetch('https://api.spotify.com/v1/audio-features/?ids=' +
      bad_track_ids.toString(),
      {headers: {'Authorization': 'Bearer ' + this.props.token}}
    )
    let bad_audio_features = await bad_audio_features_response.json();

    // console.log("good_audio_features:",good_audio_features)

    axios.post(
      'http://localhost:4000/train', {
        good: good_audio_features.audio_features,
        bad: bad_audio_features.audio_features,
        user: this.props.user
      })
      .then(res => {
        console.log(res.data)
      });

    //Do something with axios here
    // console.log('submit training selection!!');
    this.props.trained();
  }

  render() {
    console.log("props: " , this.props)
    return(
      <div>
        Good Playlist:
          <DropdownMenu
            id={1}
            playlists={this.props.playlists}
            handleClick={this.handleClickGood}
          />
        {/* Okay Playlist:
          <DropdownMenu
            id={2}
            playlists={this.props.playlists}
            handleClick={this.handleClickOkay}
          /> */}
        Bad Playlist:
          <DropdownMenu
            id={3}
            playlists={this.props.playlists}
            handleClick={this.handleClickBad}
          />
        {this.state.good && this.state.bad ?
        // {this.state.good && this.state.okay && this.state.bad ?
          <Button bsStyle="primary" className='btn btn-success btn-sm m-2'
            onClick={this.submitTrainingSelection}
          >
            Submit!
          </Button> :
          <Button bsStyle="default" className='btn btn-default btn-sm m-2'>
            Please select a playlist for each
          </Button>
        }
      </div>
    )
  }
}

export default TrainingSelection;

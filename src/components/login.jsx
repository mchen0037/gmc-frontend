import React, {Component} from 'react';

//From https://api.spotify.com/v1/me
// https://api.spotify.com/v1/me/playlists
let userInfoFromServer = {
  user: {
    display_name: 'nothing_faith',
    id: 'some_id_string',
  },
  playlists: [
    {
      id: 'some_playlist_id1',
      name: "good",
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
      name: "bad",
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
    }
  ]
};

class Login extends Component {

  constructor(props) {
    super(props)
    this.login = this.login.bind(this);
    this.state = {
      user: {},
      playlists: {}
    }
  }

  login() {
    this.setState(
      { user: userInfoFromServer.user,
        playlists: userInfoFromServer.playlists
      });
  }

  render() {
    console.log('hey');
    console.log(this.state)
    return(
      <div>
        <button
          className='btn btn-success btn-sm m-2'
          onClick={this.login}
          >
          Sign In with Spotify
        </button>
        {this.state.user.display_name ?
          <div>{this.state.user.display_name}</div> :
          <div>Pls sign in</div>
        }
      </div>
    )
  }
}

export default Login;

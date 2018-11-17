import React, {Component} from 'react';

class Login extends Component {

  constructor(props) {
    super(props)
  }

  //make axios calls here, then pass state up to App.js

  render() {
    return(
      <div>
        <button
          className='btn btn-success btn-sm m-2'
          onClick={this.props.handleLogin}
          >
          Sign In with Spotify
        </button>
        {this.props.user.display_name ?
          <div>{this.props.user.display_name} is logged in.</div> :
          <div>Please Sign in!</div>
        }
      </div>
    )
  }
}

export default Login;

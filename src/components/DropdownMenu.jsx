import React, {Component} from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';

class DropdownMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: "Select a Playlist"
    }
  }

  chosePlaylist(name) {
    this.props.handleClick()
    this.setState({status: name})
  }

  render() {
    // console.log("props: " , this.props)
    return(
      <div>
        <div className="dropdown">
          <DropdownButton title={this.state.status}
            id="dropdown-size-small"
            className='btn btn-primary btn-sm m-2'>
            {this.props.playlists.map(playlist =>
              <MenuItem
                key={playlist.id}
                onClick={() => this.chosePlaylist(playlist.name)}>
                {playlist.name}
              </MenuItem>
            )}
          </DropdownButton>
        </div>
      </div>
    )
  }
}

export default DropdownMenu;

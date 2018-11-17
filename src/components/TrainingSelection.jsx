import React, {Component} from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';
// import {MenuItem} from 'react-bootstrap';

class TrainingSelection extends Component {

  constructor(props) {
    super(props)
  }

  //make axios calls here, then pass state up to App.js

  render() {
    console.log("props: " , this.props)
    return(
      <div>
        <div className="dropdown">
          Good:
          <DropdownButton title="Default button"
            id="dropdown-size-medium"
            className='btn btn-primary btn-sm m-2'>
            {this.props.playlists.map(playlist =>
              <MenuItem eventKey="1">{playlist.name}</MenuItem>
            )}
          </DropdownButton>
        </div>
      </div>
    )
  }
}

export default TrainingSelection;

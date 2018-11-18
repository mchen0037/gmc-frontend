import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

class TrainedPage extends Component {

  // constructor(props) {
  //   super(props)
  // }

  //make axios calls here, then pass state up to App.js

  render() {
    return(
      <div>
        <Button
          bsStyle="default"
          bsClass='btn btn-primary btn-sm m-2'
          onClick={this.props.nowTesting}
          >
            Test A Song
          </Button>
        <Button
          bsStyle="default"
          bsClass='btn btn-danger btn-sm m-2'
          onClick={this.props.handleDelete}>
            Delete Model
        </Button>

      </div>
    )
  }
}

export default TrainedPage;

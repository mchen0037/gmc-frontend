import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';

class TrainedPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      models : []
    };
  }

  render() {
    // axios.get(
    //   'http://localhost:4000/all')
    //   .then(res => {
    //     this.setState()
    //   });
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

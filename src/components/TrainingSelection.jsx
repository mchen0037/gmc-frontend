import React, {Component} from 'react';
// import {DropdownButton, MenuItem} from 'react-bootstrap';
import DropdownMenu from './DropdownMenu.jsx';
import {Button} from 'react-bootstrap';

class TrainingSelection extends Component {

  constructor(props) {
    super(props)
    this.state = {
      good: false,
      okay: false,
      bad: false
    };
    this.handleClickGood = this.handleClickGood.bind(this);
    this.handleClickOkay = this.handleClickOkay.bind(this);
    this.handleClickBad = this.handleClickBad.bind(this);
    this.submitTrainingSelection = this.submitTrainingSelection.bind(this);
  }


//Bad way to handle this.
  handleClickGood() {
    this.setState( {good: true})
  }
  handleClickOkay() {
    this.setState( {okay: true})
  }
  handleClickBad() {
    this.setState( {bad: true})
  }


  submitTrainingSelection() {
    //Do something with axios here
    console.log('submit training selection!!');
    this.props.trained();
  }

  render() {
    // console.log("props: " , this.props)
    return(
      <div>
        Good Playlist:
          <DropdownMenu
            id={1}
            playlists={this.props.playlists}
            handleClick={this.handleClickGood}
          />
        Okay Playlist:
          <DropdownMenu
            id={2}
            playlists={this.props.playlists}
            handleClick={this.handleClickOkay}
          />
        Bad Playlist:
          <DropdownMenu
            id={3}
            playlists={this.props.playlists}
            handleClick={this.handleClickBad}
          />
        {this.state.good && this.state.okay && this.state.bad ?
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

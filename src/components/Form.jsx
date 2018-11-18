import React, {Component} from 'react';
import {FormGroup, ControlLabel, HelpBlock, FormControl} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

class Form extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleChange(e) {
    this.setState(
      { value: e.target.value
      });
  }

  handleButtonClick() {
    this.props.addSongs(this.state.value)
    this.setState({value: ''})
  }

  render() {
   return (
     <form>
       <FormGroup
         controlId="formBasicText"
       >
         <ControlLabel>Testing New Songs!</ControlLabel>
         <FormControl
           type="text"
           value={this.state.value}
           placeholder="Enter a Spotify URI"
           onChange={this.handleChange}
         />
         <Button
          bsStyle="default"
          className='btn btn-success btn-sm m-2'
          onClick={this.handleButtonClick}>
           Submit
         </Button>
         <FormControl.Feedback />
         <HelpBlock>Example: spotify:track:5HeKOKc4phmLn8e4I7EkzD</HelpBlock>
       </FormGroup>
     </form>
   );
 }
}

export default Form;

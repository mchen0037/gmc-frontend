import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

class TestingPage extends Component {

  // constructor(props) {
  //   super(props)
  // }

  render() {
    console.log('Results props:' ,this.props)
    return(
      <Table>
        <thead>
          <tr>
            <th>URI</th>
            <th>Song Name</th>
            <th>Result</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {this.props.songs.map(song =>
            <tr>
              <td>{song.key}</td>
              <td>{song.name ? song.name : "Song Name"}</td>
              <td>{song.result ? song.result : "Result"}</td>
              <td>
                <Button
                  bsStyle="default"
                  className='btn btn-danger btn-sm m-2'
                  onClick={() => this.props.handleDeleteSong(song.key)}>
                    X
                </Button>
              </td>
            </tr>
        )}
      </tbody>
      </Table>
  )}
}

export default TestingPage;

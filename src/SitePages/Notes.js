import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import '../Split.css';
import ApiContext from '../ApiContext';

class Notes extends React.Component {
  static contextType = ApiContext;

  // make function getNoteName that compares id's and returns id match name
  getNoteName = () => {
    let noteMatch = this.context.notes.find(
      (note) => note.id === this.props.id
    );
    return noteMatch.name;
    // filter the notes array in context to the note that matches this.props.id
    // isolate the name property from that specific note object
  };
  // make function getNoteModified that compares id's and returns id match modified date
  getNoteModified = () => {
    let noteModified = this.context.notes.find(
      (noteMod) => noteMod.id === this.props.id
    );
    return noteModified.modified;
  };
  render() {
    return (
      <div>
        <fieldset className='list-style'>
          <h2>
            <Link to={`/note/${this.props.id}`}>{this.getNoteName()}</Link>
          </h2>
          <h3>{moment(this.getNoteModified()).format('MM-DD-YY')}</h3>
          <button onClick={() => this.context.deleteNote(this.props.id)}>
            Remove
          </button>
        </fieldset>
      </div>
    );
  }
}

export default Notes;

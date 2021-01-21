import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
//import { format } from 'date-fns';
import '../Split.css';
import ApiContext from '../ApiContext';
import ErrorBoundaries from '../ErrorBoundaries';
import PropTypes from 'prop-types';

class Notes extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = ApiContext;

  // make function getNoteName that compares id's and returns id match name
  getNoteName = () => {
    const noteId = this.props.id
    
    let noteMatch = this.context.notes.find(
      (note) => note.id === noteId
    )
     
    return noteMatch.title;
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

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id
    this.context.deleteNote(noteId)
    this.props.onDeleteNote(noteId)
  }
  render() {
    const { id } = this.props
    return (
      
      <ErrorBoundaries>
        <div>
          <fieldset className='list-style note-style'>
            <h2>
              <Link to={`/note/${id}`}>
                {this.getNoteName()}
              </Link>
            </h2>
            <h3>
              {moment(this.getNoteModified()).format('MM-DD-YY')}
            </h3>
            <button 
              // onClick={() => this.context.deleteNote(this.props.id)}
              onClick={this.handleClickDelete}
            >
              Remove
            </button>
          </fieldset>
        </div>
      </ErrorBoundaries>
    );
  }
}
Notes.propTypes = {
  match: PropTypes.number,

};

export default Notes;

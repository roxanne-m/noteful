import React from 'react';
import '../Split.css';
import Notes from './Notes';
import ApiContext from '../ApiContext';
import PropTypes from 'prop-types';
import ErrorBoundaries from '../ErrorBoundaries';
import { findNote } from '../notes-helpers'

class Content extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = ApiContext;

  handleDeleteNote = (noteId) => {
    this.props.history.push(`/`)
  }

  render() {
    const { notes = [] } = this.context;
    //const noteId = this.props.match.params.noteId;
    const { noteId } = this.props.match.params
    const note = findNote(notes, Number(noteId)) || { content: '' };
    
    //const currentFolder = findFolder(this.context.folders, note.folderId);
  
    return (
      <ErrorBoundaries>
        <div className='form-styling'>
          <div className='split left note-style'>
            <button onClick={() => this.props.history.goBack()}>Go Back</button>
          </div>
          <div className='split right note-style'>
            <Notes 
              id={note.id}
              name={note.name}
              modified={note.modified}
              onDeleteNote={this.handleDeleteNote}
            />
            <div className='content-style'>
              {/* {note.content} */}
              {note.content.split(/\n \r|\n/).map((para, i) =>
                <p key={i}>{para}</p>
              )}
            </div>
          </div>
        </div>
      </ErrorBoundaries>
    );
  }
}

Content.propTypes = {
  history: PropTypes.object,
  goBack: PropTypes.func,
  match: PropTypes.object,
};

export default Content;

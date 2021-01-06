import React from 'react';
import '../Split.css';
import Notes from './Notes';
import ApiContext from '../ApiContext';
import PropTypes from 'prop-types';
import ErrorBoundaries from '../ErrorBoundaries';

class Content extends React.Component {
  static contextType = ApiContext;
  /* Function that finds notes for given note clicked on */
  findNote = (notes = [], noteId) => notes.find((note) => note.id === noteId);

  findFolder = (folders, folderId) => {
    return folders.find((folder) => folder.id === folderId);
  };
  render() {
    const { notes = [] } = this.context;
    const noteId = this.props.match.params.noteId;
    const note = this.findNote(notes, noteId) || { content: '' };
    // console.log(note);
    const currentFolder = this.findFolder(this.context.folders, note.folderId);
   console.log(this.context.folders);
    return (
      <ErrorBoundaries>
        <div className='form-styling'>
          <div className='split left note-style'>
            <button onClick={() => this.props.history.goBack()}>Go Back</button>
            <br />
            <br />
            <fieldset className='folder-style'>{currentFolder.name}</fieldset>
          </div>
          <div className='split right note-style'>
            <Notes id={note.id} />
            <div className='content-style'>{note.content}</div>
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

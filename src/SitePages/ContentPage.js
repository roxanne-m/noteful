import React from 'react';
import '../Split.css';
import Notes from './Notes';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';

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
    // console.log(this.props);
    return (
      <div>
        <div className='split left'>
          <Link to={'/'}>Go Back</Link>
          <div>{currentFolder.name}</div>
        </div>
        <div className='split right'>
          <Notes id={note.id} />
          {note.content}
        </div>
      </div>
    );
  }
}

export default Content;

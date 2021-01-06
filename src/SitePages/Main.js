import React from 'react';
import '../Split.css';
import Notes from './Notes';
import Folder from './Folder';
import ApiContext from '../ApiContext';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ErrorBoundaries from '../ErrorBoundaries';

class Main extends React.Component {
  static contextType = ApiContext;

  // write a function
  //isolate current folder id using the current url
  // if there is no current folder, make notes from full note array
  // if there is a specific folder id, filter to a new array where each note's folderId matches the current folderId
  // generate Notes components from this filtered array of notes

  generateNoteList = () => {
    let currentFolderId = this.props.match.params.folderId;
    // console.log(currentFolderId);
    let notes;

    if (currentFolderId) {
      notes = this.context.notes.map((note) => {
        if (note.folderId === currentFolderId) {
          return (
            <li key={note.id}>
              <Notes id={note.id} /> <br />
            </li>
          );
        }
      });
    } else {
      notes = this.context.notes.map((note) => {
        return (
          <li key={note.id}>
            <Notes id={note.id} /> <br />
          </li>
        );
      });
    }

    return notes;
  };

  render() {
    const { folders } = this.context;
    return (
      <ErrorBoundaries>
      <main>
        <div className='main-styling'>
          <section className='split left'>
            <h2>
              <b><u>Folders List</u></b>
            </h2>
            <Link to='/add-folder'
             className='add-button'>Add Folder
            </Link>
            <ul>
              {folders.map((folder) => (
                <li key={folder.id}>
                  <Folder id={folder.id} />
                </li>
              ))}
            </ul>
          </section>
          <section className='split right'>
            <h2 className='note-list-title'>
              <b><u>Notes List</u></b>
            </h2>
            <Link to='/add-note'
               className='add-button'>Add <br/>Note
            </Link>
            <ul>{this.generateNoteList()}</ul>
          </section>
        </div>
      </main>
      </ErrorBoundaries>
    );
  }
}

Main.propTypes = {
  match: PropTypes.object,
};

export default Main;

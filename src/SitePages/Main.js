import React from 'react';
import '../Split.css';
import Notes from './Notes';
import Folder from './Folder';
import ApiContext from '../ApiContext';



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

    if(currentFolderId) {

      notes = this.context.notes.map((note) => {

        if(note.folderId === currentFolderId) {
          return (
            <li key={note.id}>
        <Notes
          id={note.id}
        />
      </li>)
        }

      })


    } else {
      notes = this.context.notes.map((note) => {
        return (
          <li key={note.id}>
      <Notes
        id={note.id}
      />
    </li>)
      })
    }

    return notes
  }


  render() {
    const {notes, folders } = this.context
    return (
      <div>
        <main>
          <section className='split left'>
            <ul>
              {folders.map((folder) => (
                <li key={folder.id}>
                  <Folder
                    id={folder.id}
                  />
                </li>
              ))}

              <div>
                <br />
                <button className='addFolder-button'>Add Folder</button>
              </div>
            </ul>
          </section>
          <section className='split right'>
            <ul>
            {this.generateNoteList()}

              <div>
                <br />
                <button className='addNote-button'>Add Note</button>
              </div>
            </ul>
          </section>
        </main>
      </div>
    );
  }
}

export default Main;

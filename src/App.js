import React from 'react';
import Main from './SitePages/Main';
import { Route, Link } from 'react-router-dom';
import DummyStore from './DummyStore';
import Content from './SitePages/ContentPage';
import './Split.css';
import ApiContext from './ApiContext';
import config from './config';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      folders: [],
    };
  }

  componentDidMount = () => {
    Promise.all([
      fetch(`${config.url}/notes`),
      fetch(`${config.url}/folders`)
    ])

    .then(([notesResponse, foldersResponse]) =>{
      if(!notesResponse.ok)
      return notesResponse.json().then(error => Promise.reject(error));

      if(!foldersResponse.ok)
      return foldersResponse.json().then(error => Promise.reject(error));

      return Promise.all([notesResponse.json(), foldersResponse.json()])
    })

    .then(([notes, folders]) =>{
      console.log(notes,folders)
      this.setState({notes, folders});
    })

    .catch(error =>{
      console.error({error});
    });
  };

  

  /* This function filters through the notes and stores array of all notes except note needed to be deleted */
handleDeleteNote = noteId => {

  const deleteUrl = `${config.url}/notes/${noteId}`;

    fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        } else {
          this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
          });
        }
      })
      .catch((error) => console.log(error));
  
}

  getNotes = (notes = [], folderId) =>
    !folderId ? notes : notes.filter((note) => note.folderId === folderId);

 

  render() {

    /* set global prop value */
    const value ={

      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      getNotes: this.getNotes

    };

    return (
      <ApiContext.Provider value={value}>
      <div>
        <header className='MainPage-header'>
          <h1>
          <Link to='/'>
            Noteful
          </Link>
          </h1>
        </header>
        {/* Create for loop that maps through list items */}
        {['/', '/folder/:folderId'].map((path) => (
          <Route
            exact
            key={path}
            path={path}
            component = {Main}
          />
        ))}
        <Route
          path='/note/:noteId'
          component = {Content}
        />
      </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
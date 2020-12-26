import React from 'react';
import Main from './SitePages/Main';
import { Route, Link } from 'react-router-dom';
import DummyStore from './DummyStore';
import Content from './SitePages/ContentPage';
import './Split.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      folders: [],
    };
  }

  componentDidMount = () => {
    this.setState(DummyStore);
  };

  getNotes = (notes = [], folderId) =>
    !folderId ? notes : notes.filter((note) => note.folderId === folderId);

  /* Function that finds notes for given note clicked on */
  findNote = (notes = [], noteId) => notes.find((note) => note.id === noteId);

  render() {
    const { notes, folders } = this.state;
    return (
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
            render={(routeProps) => {
              const { folderId } = routeProps.match.params;
              const notesForFolder = this.getNotes(notes, folderId);
              return (
                <Main
                  {...routeProps}
                  notes={notesForFolder}
                  folders={folders}
                  folderNotes={notes}
                />
              );
            }}
          />
        ))}
        <Route
          path='/note/:noteId'
          render={(routeProps) => {
            const { noteId } = routeProps.match.params;
            const note = this.findNote(notes, noteId);
            return <Content {...routeProps} note={note} folders={folders} />;
          }}
        />
      </div>
    );
  }
}

export default App;
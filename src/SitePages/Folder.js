import React from 'react';
import { NavLink } from 'react-router-dom';
import ApiContext from '../ApiContext';
import '../Split.css';
import ErrorBoundaries from '../ErrorBoundaries';

// refactor from props to context
// look at a prop that were using
// add it into context
// go to the component that needs it
// made sure its a class component / refactored if not
// import context to use
// change component from using prop to using context

class Folder extends React.Component {
  static contextType = ApiContext;

  // Function that takes the folder id, looks through folders in context, and returns number of notes in that folder
  getFolderLength = () => {
    let length = this.context.notes.filter(
      (note) => note.assigned_folder === this.props.id
    ).length;
    return length;
  };

  //Function that takes the folder id, looks through folders in context, and returns the name of that folder
  getFolderTitle = () => {
    let currentFolder = this.context.folders.find(
      (folder) => folder.id === this.props.id
    ); console.log(currentFolder);
    return currentFolder.title;
  };

  render() {
    console.log(this.context)
    return (
      <ErrorBoundaries>
        <div>
          <fieldset className='folder-style'>
            <NavLink to={`/folder/${this.props.id}`}>
              {this.getFolderTitle()}
              {': '}
            </NavLink>
            {this.getFolderLength()}
          </fieldset>
        </div>
      </ErrorBoundaries>
    );
  }
}

export default Folder;

import React from 'react';
import ApiContext from '../ApiContext';
import PropTypes from 'prop-types';
import '../Split.css';
import config from '../config';

class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteName: null,
      noteContent: null,
      targetFolderId: null,
      error: null,
    };
  }

  static contextType = ApiContext;

  // on this submit button perform post request
  handleSubmit(e) {
    e.preventDefault();
    const nName = e.target.noteName.value;
    const nContent = e.target.content.value;
    const targetF = e.target.targetFolder.value;

    // perform fetch request and error handling
    fetch(`${config.url}/notes`, {
      method: 'POST',
      body: JSON.stringify({
        title: nName,
        content: nContent,
        assigned_folder: targetF,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong, could not add new folder.');
        }

        return res.json();
      })
      .then((data) => {
        this.context.addNote(data);
        this.props.history.goBack();
      })
      .catch((err) => {
        alert(err);
      });
  }


  // set variable to store folder option selected
  selectOptions = () => {
    let selectOptions = this.context.folders.map((folder, i) => {
        return (
          <option key={folder.id} value={folder.id}>
            {' '}
            {folder.title}{' '}
          </option>
        );
      });
      return selectOptions;
  }
 

  render() {
    
    return (
      <div>
        <form className='addNote' onSubmit={(e) => this.handleSubmit(e)}>
          <fieldset>
            <h2>Create a New Note</h2>
            <label htmlFor='name'>
              <b>Note Name: </b>
            </label>
            <br />
            <input type='text' name='noteName' required />
            <br />
            <br />
            <label htmlFor='content'>
              <b>Note Content: </b>
            </label>
            <br />
            <textarea name='content' placeholder='Enter note content here.' required/>
              
            <br />
            <label htmlFor='targetFolder'>Select a Folder</label>
            <br />
            <select name='targetFolder' id='targetFolder' required>
              <option value={''}> Select a Folder </option> {this.selectOptions()}
            </select>
            <br />
            <br />
            <div className='form-button'>
            <button type='submit'>Submit</button>
            </div>
            <br />
            <br />
            <div className='form-button'>
            <button
              className='addNoteButton'
              onClick={() => this.props.history.goBack()}
            >
              Cancel
            </button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

AddNote.propTypes = {
  history: PropTypes.object.isRequired,
  goBack: PropTypes.func,
};

export default AddNote;

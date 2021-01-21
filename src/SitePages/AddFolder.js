import React from 'react';
import ApiContext from '../ApiContext';
import '../Split.css';
import config from '../config';
import PropTypes from 'prop-types';


class AddFolder extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            folderName: null,
            error: null
        };
    }
    static contextType = ApiContext;

    // on this submit button perform post request
    handleSubmit(e){
        e.preventDefault();
        const fName = e.target.folderName.value;

    

        // perform fetch request and error handling
        fetch(`${config.url}/folders`, {
            method: "POST",
            body: JSON.stringify({title: fName}),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) =>{
            if(!res.ok){
                throw new Error("Something went wrong, could not add new folder.");
            }

            return res.json();
        })
        .then((data) =>{
            this.context.addFolder(data);
            this.props.history.goBack();
        })
        .catch((err) =>{
            alert(err);
        });
    }

    render(){
      

        return(
            <div>
                <form className="addFolder" onSubmit={e => this.handleSubmit(e)}
                >
                    <fieldset>
                    <h2>Create a New Folder</h2>
                    <label htmlFor="name">Folder Name: </label>
                    <input type='text' name='folderName' required/>
                    <br/><br/>
                    <div className='form-button'>
                    <button type='submit'>Submit</button>
                    </div>
                    <br/>
                    <br/>
                    <div className='form-button'>
                    <button onClick={() => this.props.history.goBack()}>Cancel</button>
                    </div>
                    </fieldset>
                </form>
            </div>
        );
    };
}

AddFolder.propTypes ={
    history: PropTypes.object
};

export default AddFolder;
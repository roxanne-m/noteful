import React from 'react';
import '../Split.css';
import Notes from './Notes'
import { Route, Link } from 'react-router-dom';

class Content extends React.Component {
    findFolder = (folders, folderId) => {
        return folders.find((folder) =>folder.id === folderId)
    }
    render() {
        const currentFolder = this.findFolder(this.props.folders, this.props.note.folderId)
        return (
            <div>
            <div className='split left'>
                <Link to = {'/'}>
                    Go Back
                </Link>
                <div>
                    {currentFolder.name}
                </div>
                
            </div>
            <div className='split right'>
        <Notes 
            id = {this.props.note.id}
            name = {this.props.note.name}
            modified = {this.props.note.modified}
        />
            {this.props.note.content}
        </div>
        </div>
        )
    }
}

export default Content;
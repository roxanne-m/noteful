import React from 'react';
import '../Split.css';
import Notes from './Notes'
import Folder from './Folder';

function getNumber(notes=[], folderId) {
    let x = notes.filter(note => note.folderId === folderId).length
    return x;
} 


function Main(props) {
        return(
            <div>
            
            <main>
                <section className='split left'>
                <ul>
                        {props.folders.map(folder =>
                            <li key={folder.id}>
                                <Folder 
                                    name = {folder.name}
                                    number = {getNumber(props.folderNotes, folder.id)}
                                    id = {folder.id}
                                    
                                />
                            </li>
                        )} 
                    </ul>
                </section>
                <section className='split right'>
                    <ul>
                        {props.notes.map(note =>
                            <li key={note.id}>
                                <Notes 
                                    id = {note.id}
                                    name = {note.name}
                                    modified = {note.modified}
                                />
                            </li>
                        )} 
                    </ul>
                </section>
            </main>
            </div>
        )
}

export default Main;
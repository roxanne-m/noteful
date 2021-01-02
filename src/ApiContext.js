import React from 'react';

// defaults if nothing is passed in value
const ApiContext = React.createContext({
    folders: [],
    notes: [],
    addFolder: () => {},
    addNote: () => {},
    deleteNote: () => {},
    getNotes: () => {},
})

export default ApiContext;
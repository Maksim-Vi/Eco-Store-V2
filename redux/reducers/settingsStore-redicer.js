const SET_SETTINGS = 'SET_SETTINGS'

let initialState = {
    settings: {}
};

const settingsStoreReducer = (state = initialState, action) =>{
    switch (action.type) { 
        case SET_SETTINGS:{
            return {...state, settings: action.settings}
        }
        default:
            return state;
    }
} 

export  const setSettingsStore = (settings) => ({ type: SET_SETTINGS, settings })

export default settingsStoreReducer;
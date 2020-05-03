import stringConstants from '../stringConstants.jsx'

let defaultState = {
    mode: true,
    registered: [],
    loggedin:[],
    contactDataBase:[],
    addPopup:false,
    selectedContacts:[],
    tableContacts:[],
    editPopup:false
}
export default function performAction(state = defaultState, action) {
    switch (action.type) {
        // case stringConstants.GETGRAPHTYPE:
        //     return Object.assign({}, state, {
        //         graphType:
        //             action.graphType,
        //     })
        // case stringConstants.SORT_TYPES_ACTION:
        //     return Object.assign({}, state, {
        //         sortType:
        //             action.sortType,
        //     })
        // case stringConstants.INDIAGEOJSONACTION:
        //     return Object.assign({}, state, {
        //         getindiageojson: action.getindiageojson
        //     })
        // case stringConstants.COUNTRYJSONACTION:
        //     return Object.assign({}, state, {
        //         getCountryjson: action.getCountryjson
        //     })
        case stringConstants.EDIT_POPUP:
            return Object.assign({}, state, {
                editPopup: action.editPopup
            })
        case stringConstants.TABLECONTACTS:
            return Object.assign({}, state, {
                tableContacts: action.tableContacts
            })
        case stringConstants.SELECTEDCONTACTS:
            return Object.assign({}, state, {
                selectedContacts: action.selectedContacts
            })
        case stringConstants.ADD_POPUP:
            return Object.assign({}, state, {
                addPopup: action.addPopup
            })
        case stringConstants.CONTACTDB:
            return Object.assign({}, state, {
                contactDataBase: action.contactDataBase
            })
        case stringConstants.LOGGEDIN:
            return Object.assign({}, state, {
                loggedin: action.loggedin
            })
        case stringConstants.SET_REGISTER:
            return Object.assign({}, state, {
                registered: action.registered
            })
        case "DARKMODE":
            return Object.assign({}, state, {
                mode: action.mode
            })
        default:
            return state
    }
}


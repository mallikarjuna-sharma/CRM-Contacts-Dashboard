
import stringConstants from '../stringConstants.jsx';

export function isLoggedIn(loggedin) {
    const action = {
        type: stringConstants.LOGGEDIN,
        loggedin
    }
    return action
}


export function setRegister(registered) {
    const action = {
        type: stringConstants.SET_REGISTER,
        registered
    }
    return action
}

export function getContactDB(contactDataBase) {
    const action = {
        type: stringConstants.CONTACTDB,
        contactDataBase
    }
    return action
}

export function openAddPopup(addPopup) {
    const action = {
        type: stringConstants.ADD_POPUP,
        addPopup
    }
    return action
}

export function getselectedContacts(selectedContacts) {
    const action = {
        type: stringConstants.SELECTEDCONTACTS,
        selectedContacts
    }
    return action
}


export function getAvailableContacts(tableContacts) {
    const action = {
        type: stringConstants.TABLECONTACTS,
        tableContacts
    }
    return action
}

export function openEditPopup(editPopup) {
    const action = {
        type: stringConstants.EDIT_POPUP,
        editPopup
    }
    return action
}


// export function getWorldStats(getWorldStats) {
//     const action = {
//         type: stringConstants.WORLD_COUNTRY_STATS,
//         getWorldStats
//     }
//     return action
// }

// export function setXaxisLabel(xAxisLabel) {
//     const action = {
//         type: stringConstants.X_LABEL,
//         xAxisLabel
//     }
//     return action
// }


// export function setYaxisLabel(yAxisLabel) {
//     const action = {
//         type: stringConstants.Y_LABEL,
//         yAxisLabel
//     }
//     return action
// }

// export function setGraphSlice(graphStart) {
//     const action = {
//         type: stringConstants.GRAPH_SLICE,
//         graphStart
//     }
//     return action
// }


// export function setTableData(tableData) {
//     const action = {
//         type: stringConstants.TABLE_DATA,
//         tableData
//     }
//     return action
// }


// export function setSelectedCountry(selectedCountry) {
//     const action = {
//         type: stringConstants.SELECTEDCOUNTRY,
//         selectedCountry
//     }
//     return action
// }
// export function setAppMode(mode) {
//     const action = {
//         type: stringConstants.DARKMODE,
//         mode
//     }
//     return action
// }
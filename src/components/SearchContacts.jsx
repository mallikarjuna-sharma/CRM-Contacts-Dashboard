import * as React from 'react';
import { MultipleSelect } from 'react-select-material-ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose'
import {
  setRegister, openAddPopup, getAvailableContacts,
  isLoggedIn, getContactDB, getselectedContacts
  , openEditPopup
} from './actions/index.jsx';
import withWidth from '@material-ui/core/withWidth';


function SearchContacts(props) {

  const [value, setvalue] = React.useState([]);

  React.useEffect(() => { console.log(props.tableContacts, 'props.tableContacts') }, [props.tableContacts])


  const handleChange = (value, contact) => {
    setvalue(value)

    if (value) {
      const contactTemp = props.selectedContacts.slice();

      props.contactDataBase && props.contactDataBase.length &&
        props.contactDataBase.map((e, index) => {
          if (contact && contact.length) {
            contact.map(selectedContact => {
              if (props.loggedin && props.loggedin[0] && props.loggedin[0].phone && e[props.loggedin[0].phone]
                && e[props.loggedin[0].phone].phone
                && (e[props.loggedin[0].phone].phone === selectedContact.value)
                && (e[props.loggedin[0].phone].name === selectedContact.label)) {
                contactTemp.push(e);
                return;
              }
            })
          }

        })
      props.getselectedContacts(contactTemp)
    }
    else {

      const contactTemp = props.selectedContacts.slice();
      contactTemp.splice(0, 1)
      props.getselectedContacts(contactTemp)
    }


  };

  return (
    <div className="App">
      <MultipleSelect
        label="Search Saved Contacts"
        values={value}
        options={(props.tableContacts && props.tableContacts.length) ? props.tableContacts.map(e => { return { "label": e.name, "value": e.phone } }) : []}
        onChange={(value, contact) => handleChange(value, contact)}
        SelectProps={{
          isMulti: true,
          isCreatable: false,
          isClearable: true,
          closeMenuOnSelect: true,
          msgNoOptionsAvailable: (props.tableContacts && props.tableContacts.length) ? 'All Contacts are Selected' : 'No Contact Found',
          msgNoOptionsMatchFilter: (props.tableContacts && props.tableContacts.length) ? 'No Contacts name matches the filter' : 'No Contact Found'
        }}
      />
    </div>
  );



}


function mapStateToProps(state) {
  return {
    loggedin: state.loggedin,
    registered: state.registered,
    contactDataBase: state.contactDataBase,
    selectedContacts: state.selectedContacts,
    tableContacts: state.tableContacts
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setRegister, openAddPopup, getAvailableContacts,
    isLoggedIn, getContactDB, getselectedContacts, openEditPopup
  }, dispatch)
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withWidth())(SearchContacts);

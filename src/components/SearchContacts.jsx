import * as React from 'react';
import { MultipleSelect } from 'react-select-material-ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose'
import {
    setRegister, openAddPopup,getAvailableContacts,
    isLoggedIn , getContactDB,getselectedContacts
    ,openEditPopup
  } from './actions/index.jsx';
  import withWidth from '@material-ui/core/withWidth';


function SearchContacts(props) {

  const [value, setvalue] = React.useState([]);

  React.useEffect(() => { console.log(props.tableContacts,'props.tableContacts') } ,[props.tableContacts])

  const options = ['New York', 'London', 'Vienna', 'Budapest'];

  const handleChange = (values, e) => {
    console.log(values);
    console.log(e);
    setvalue(values)
  };

  return (
    <div className="App">
      <MultipleSelect
        label="Search Saved Contacts"
        values={value}
        options={  (props.tableContacts && props.tableContacts.length) ? props.tableContacts.map(e => e.name) : [] }
        // helperText="Search from Saved Contacts"
        onChange={(values, e) => handleChange(values, e)}
        SelectProps={{
          isMulti: true,
          isCreatable: false,
          isClearable: true,
          closeMenuOnSelect: true,
          msgNoOptionsAvailable: 'All Contacts are Selected',
          msgNoOptionsMatchFilter: 'No Contacts name matches the filter'
        }}
      />
    </div>
  );



}


function mapStateToProps(state) {
  return {
      loggedin: state.loggedin,
      registered: state.registered,
      contactDataBase:state.contactDataBase,
      selectedContacts:state.selectedContacts,
      tableContacts: state.tableContacts
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      setRegister,openAddPopup,getAvailableContacts,
      isLoggedIn,getContactDB,getselectedContacts,openEditPopup
  }, dispatch)
}

export default compose(connect(mapStateToProps, mapDispatchToProps),withWidth())(SearchContacts);

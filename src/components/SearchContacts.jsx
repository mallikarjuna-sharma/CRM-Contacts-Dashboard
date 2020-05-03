import * as React from 'react';
import { MultipleSelect } from 'react-select-material-ui';

function SearchContacts(props) {

  const [value, setvalue] = React.useState([]);

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
        options={options}
        // helperText="Search from Saved Contacts"
        onChange={(values, e) => handleChange(values, e)}
        SelectProps={{
          isMulti: true,
          isCreatable: false,
          isClearable: true,
          closeMenuOnSelect: false,
          msgNoOptionsAvailable: 'All Contacts are Selected',
          msgNoOptionsMatchFilter: 'No Contacts name matches the filter'
        }}
      />
    </div>
  );



}

export default SearchContacts;

import React from 'react';
import { Grid, Typography, Button,Hidden } from '@material-ui/core';
import Contactimg from '../assests/contacts.png'
import SearchContacts from './SearchContacts.jsx'
import DisplayContacts from './DisplayContacts.jsx'
import withWidth from '@material-ui/core/withWidth';
import SelectedContact from './SelectedContact.jsx'
import  AddContact from '../components/popups/AddContact.jsx'
import  EditContact from '../components/popups/EditContact.jsx'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose'
import {
    setRegister, openAddPopup,getAvailableContacts,
    isLoggedIn , getContactDB,getselectedContacts
    ,openEditPopup
  } from './actions/index.jsx';
import { withStyles } from '@material-ui/core/styles';

function ContactsDashboard(props) {

    const hasSavedContacts = () => {
        let res = false ;
        props.contactDataBase.map((e,index) =>
        {
            if(props.loggedin && props.loggedin[0] && props.loggedin[0].phone && e[props.loggedin[0].phone]
                && e[props.loggedin[0].phone].name ){
                    res = true;
                    return 1;
                }
        })
        return res;
    }

    const handleDelete = () => {

        const db =    props.contactDataBase.filter((e) =>
        {
            if(props.loggedin && props.loggedin[0] && props.loggedin[0].phone && e[props.loggedin[0].phone]
                ){
                    const phoneDB = e[props.loggedin[0].phone].phone ;
                  
                    let res = true;
                    props.selectedContacts.map(select => {
                        const selectedPhone = select[props.loggedin[0].phone].phone 
                  
                        if(select && (selectedPhone === phoneDB)  ){
                            res = false;
                            return 1;
                        }
                    })
                    return res;
                }
        })
        props.getContactDB(db);
        const temp = [];
        props.getselectedContacts(temp);
        props.getAvailableContacts(temp);
    }

    const StyledButton = withStyles({
        root: {
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          borderRadius: 3,
          border: 0,
          color: 'white',
          height: 48,
          padding: '0 30px',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
        label: {
          textTransform: 'capitalize',
        },
      })(Button);


      const showSelectedContact = () => {

        let tablerow = []

        if(props.selectedContacts && props.selectedContacts.length)
        props.selectedContacts.slice(0, 1).map((e, index) => {
            if (props.loggedin && props.loggedin[0] && props.loggedin[0].phone && e[props.loggedin[0].phone]
                && e[props.loggedin[0].phone].phone) {

                tablerow.push(e[props.loggedin[0].phone].name);
                tablerow.push(e[props.loggedin[0].phone].gmail);
                tablerow.push(e[props.loggedin[0].phone].phone);
                tablerow.push(e[props.loggedin[0].phone].company);
                tablerow.push(e[props.loggedin[0].phone].address);
                
                return 1;
            }
      })
      return tablerow;
    }


    return (
        <Grid container spacing={4} direction="column">
            {/* <div>{`Current width: ${props.width}`}</div> */}
            <AddContact/>
            <EditContact selectedContacts={showSelectedContact()}  />
           <Grid item>
            <Grid spacing={6} container   item direction="row" alignContent="center" style={{paddingLeft:"3%"}}  alignItems={'center'}  >
                <img src={Contactimg} style={{ widht: 10, height: 40 }} />
                <Grid item md={4} >
                    <Typography variant="h3"  >
                        Contacts
                    </Typography>
                </Grid>
            </Grid>
            </Grid>
            <Grid item>
            <Grid spacing={6} container  style={{paddingLeft:"3%"}} >
                <Grid item md={3}  >
                    {<SearchContacts  />}
                </Grid>
                <Grid item md={3}  >
                    <StyledButton  onClick={e => {props.openAddPopup(true);props.getselectedContacts([])} } >
                    <AddIcon /> Contact
                    </StyledButton>
                </Grid>
                {(props.selectedContacts && props.selectedContacts.length === 1) && <Grid item md={3}  >
                    <StyledButton onClick={e => {props.openEditPopup(true);} }>
                    <EditIcon/> Contact
                    </StyledButton>
                </Grid>}
                {(props.selectedContacts && props.selectedContacts.length > 0) && <Grid item md={3}  >
                    <StyledButton  onClick={e => {handleDelete();props.getselectedContacts([]) } } >
                    <DeleteIcon/> Contacts
                    </StyledButton>
                </Grid>}
                
            </Grid>
            </Grid>
            <Grid item>
            {hasSavedContacts() && <Grid container style={{paddingLeft:"5%"}} spacing={4}>

            <Hidden mdDown>
                <Grid item lg={7}   >
                    <DisplayContacts/>
                </Grid>
            </Hidden>

            <Hidden lgUp >
                <Grid item sm={12} xs={12} md={12}  >
                    <DisplayContacts/>
                </Grid>
            </Hidden>

            {(props.selectedContacts && props.selectedContacts.length > 0) ?
            <Grid item md={12} lg={5}  xs={12} sm={12}>
                   <SelectedContact selectedContacts={showSelectedContact()} /> 
            </Grid>: null}

            </Grid>}
            </Grid>
        </Grid>
    )
}


function mapStateToProps(state) {
    return {
        loggedin: state.loggedin,
        registered: state.registered,
        contactDataBase:state.contactDataBase,
        selectedContacts:state.selectedContacts
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setRegister,openAddPopup,getAvailableContacts,
        isLoggedIn,getContactDB,getselectedContacts,openEditPopup
    }, dispatch)
  }

export default compose(connect(mapStateToProps, mapDispatchToProps),withWidth())(ContactsDashboard);
  
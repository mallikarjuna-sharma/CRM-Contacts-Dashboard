import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {Typography,Grid,TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  setRegister, openAddPopup,getselectedContacts,
  isLoggedIn,getContactDB,openEditPopup
} from '../actions/index.jsx';
import {  Slide } from '@material-ui/core';
import stringConstants from '../stringConstants.jsx'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

 function EditContact(props) {

    const {selectedContacts} = props;
    

  const [name, setname] = React.useState('');
  const [gmail, setgmail] = React.useState('');
  const [phone, setphone] = React.useState('');
  const [company, setcompany] = React.useState('');
  const [address, setaddress] = React.useState('');

  const [errorfield, seterrorfield] = React.useState(-1);

  React.useEffect(() => {


    setname((props.selectedContacts) ? (props.selectedContacts[0]) : 0 )
    setgmail((props.selectedContacts) ? (props.selectedContacts[1]) : 0)
    setphone((props.selectedContacts) ? (props.selectedContacts[2]) : 0)
    setcompany((props.selectedContacts) ? (props.selectedContacts[3]) : 0)
    setaddress((props.selectedContacts) ? (props.selectedContacts[4]) : 0)
      },[props.selectedContacts])

  const fieldStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '100%',
      },
    },
  }));

  const classes = fieldStyles();

  const handleTextFieldChange = (val,type) => {

    switch (type) {
      case "Name": { setname(val); break }
      case "Phone": { setphone(val); break }
      case "Gmail": { setgmail(val); break }
      case "Company Name": { setcompany(val); break }
      case "ADDRESS": { setaddress(val); break }
      default:
        break;
    }
  }

  const handleRegister = () => {
    if (name || phone || gmail || company || address) {

      const key = props.loggedin[0].phone;
      let contactDB = props.contactDataBase.slice();

      let updatedDB = contactDB.filter(e => {
            if(e[key] 
                && e[key].phone === selectedContacts[2] 
                 && e[key].gmail === selectedContacts[1]  ){
                     return false;
                 }
                 return true;   
      })

      let temp = { [key]  :  {name:name,phone:phone,gmail:gmail,company:company,address:address}   }
      updatedDB.push(temp)

      props.getContactDB(updatedDB);

      setname('');
      setphone('');
      seterrorfield(-1);

      props.openEditPopup(false);

      props.getselectedContacts([]);

    }
    else if(!name) seterrorfield(0)
    else if(!phone) seterrorfield(1)
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

  const getValue  = (index) => {

    switch(index){
      case 0:{return props.selectedContacts[0]}
      case 1:{return props.selectedContacts[2]}
      case 2:{return props.selectedContacts[1]}
      case 3:{return props.selectedContacts[3]}
      case 4:{return props.selectedContacts[4]}
      default: return ''
    }
  }


  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

  return (
    <div>
      {/* TransitionComponent={Transition}  */}
      <Dialog  
      // TransitionComponent={Transition}
      onClose={() =>  props.openEditPopup(false)} open={props.editPopup} >
        <DialogTitle id="customized-dialog-title" onClose={() => props.openEditPopup(false)} style={{background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'}}>
          Edit Contact
        </DialogTitle>
        <DialogContent dividers>
          <Grid container>
            <form className={classes.root} noValidate autoComplete="on">
              {stringConstants.ADDCONSTANTFIELDS.map((ind,index) => <TextField id={ind.id} type={ind.type} error={index === errorfield ? true : 0} key= {index}
            defaultValue= {getValue(index)} required label={ind.label}    helperText={index === errorfield ? 'Change Any Field value' : ''}  color="primary" onChange={(e) => handleTextFieldChange(e.target.value, ind.id)} />
              )}
            </form>
          </Grid>
        </DialogContent>
        <DialogActions>
          <StyledButton  onClick={e => handleRegister('login') } >
            Update changes
          </StyledButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}


function mapStateToProps(state) {
  return {
      loggedin: state.loggedin,
      registered: state.registered,
      contactDataBase:state.contactDataBase,
      addPopup:state.addPopup,
      editPopup:state.editPopup
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      setRegister,openAddPopup,
      isLoggedIn,getContactDB,
      openEditPopup,getselectedContacts
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);

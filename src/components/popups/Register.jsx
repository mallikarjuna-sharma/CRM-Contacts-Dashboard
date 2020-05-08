import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Dialog, Slide } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Typography, Grid, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import stringConstants from '../stringConstants.jsx';
import {
    setRegister,
    isLoggedIn
} from '../actions/index.jsx';
import useStyles from '../styles.jsx'


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
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


function Register(props) {

    const [open, setOpen] = React.useState( ' ');
    const [name, setname] = React.useState( ' ');
    const [phone, setphone] = React.useState( ' ');
    const [password, setpassword] = React.useState( ' ');
    const [confirmpassword, setconfirmpassword] = React.useState( ' ');
    const [gmail, setgmail] = React.useState( ' ');
    const [company, setcompany] = React.useState( ' ');
    const [address, setaddress] = React.useState( ' ');
    const [errorfield, seterrorfield] = React.useState(-1);
    const [login, setlogin] = React.useState(false);

    React.useEffect(() => setOpen(true), [])

    const classes = useStyles();


    const handleTextFieldChange = (val, type) => {
        switch (type) {
            case "Name": { setname(val); break; }
            case "Phone": { setphone(val); break; }
            case "Gmail": { setgmail(val); break; }
            case "password": { setpassword(val); break; }
            case "confirmpassword": { setconfirmpassword(val); break; }
            case "Company Name": { setcompany(val); break; }
            case "ADDRESS": { setaddress(val); break; }
            default:
                break;
        }
    }

    const handleRegister = (type) => {

        if (!name || name.length < 4)
            seterrorfield(0)
        else if (!phone || phone.length < 4)
            seterrorfield(1)
        else if (!gmail || gmail.length < 4)
            seterrorfield(4)
        else if (!company || company.length < 4)
            seterrorfield(5)
        else if (!address || address.length < 4)
            seterrorfield(6)
        else if (name && phone && (type == 'register')) {
            let getRegister = props.registered;
            var error = false;
            getRegister.forEach(e => {
                if (e.gmail === gmail || e.phone === phone) {
                    if (e.gmail === gmail) seterrorfield(4)
                    else if (e.phone === phone) seterrorfield(1)
                    error = true;
                    return;
                }
            })
            if (!error) {
                let arr = {
                    'phone': phone,
                    'name': name,
                    'password': password,
                    'gmail': gmail,
                    'company': company,
                    'address': address
                };
                getRegister.push(arr);
                props.setRegister(getRegister)
                let a = [];
                a.push(arr)
                props.isLoggedIn(a)
            }
        }
        else if (name && (type == 'login')) {

            let getRegister = props.registered;
            var error = true;

            var dbname, dbphone, dbgmail, dbcompany, dbaddress, dbpassword;

            getRegister.forEach(e => {
                if (e.gmail === name || e.phone === name) {

                    dbname = e.name;
                    dbphone = e.phone;
                    dbgmail = e.gmail;
                    dbcompany = e.company;
                    dbaddress = e.address;
                    dbpassword = e.password;

                    error = false;
                    return;
                }
            })
            if (!error) {

                let arr = {
                    'phone': dbphone,
                    'name': dbname,
                    'password': dbpassword,
                    'gmail': dbgmail,
                    'company': dbcompany,
                    'address': dbaddress
                }

                let a = [];
                a.push(arr)
                props.isLoggedIn(a)

            }
            else {
                seterrorfield(1)
            }
        }
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

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    // TransitionComponent={Transition}


    const resetFields = () => {

        setname('')
        setphone('')
        setpassword('')
        setconfirmpassword('')
        setgmail('')
        setcompany('')
        setaddress('')
        seterrorfield('')

    }

    const getValue = (type,index) => {

        if(type === 'register')
            switch(index){
                case "0":{
                    return name
                }
                case "1":{
                    return phone
                }
                case "2":{
                    return password
                }
                case "3":{
                    return confirmpassword
                }
                case "4":{
                    return gmail
                }
                case "5":{
                    return company
                }
                case "5":{
                    return address
                }
            }
        else
        switch(index){
            case "0":{
                return name
            }
            case "1":{
                return password
            }
        }
            

    }

    const getErrorMsg = () => {
        switch(errorfield){
            case '1':return 'Already Registered !'
            case '2':return 'Enter Valid Number !'
            case '3':return
            case '4':return
            case '5':return
            case '6':return
        }
    }


    return (
        <div>
            <Dialog 
                aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" style={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }} >
                    {!login ? 'Register' : 'Login'}       Yourself !
             </DialogTitle>

                <DialogContent dividers>

                    <form className={classes.rootregister}>

                        {!login ? stringConstants.REGISTERFIELDS.map((ind, index) => <TextField key={index} id={ind.id} type={ind.type} error={index === errorfield ? true : 0}
                            helperText={index === errorfield ? getErrorMsg() : ''} required label={ind.label} color="primary" onChange={(e) => handleTextFieldChange(e.target.value, ind.id)} 
                            value = {getValue('register',index)} />
                        ) :
                            stringConstants.LOGINFIELDS.map((ind, index) => <TextField key={index} id={ind.id} type={ind.type} error={index === errorfield ? true : 0}
                                helperText={index === errorfield ? 'Username or Password is Wrong' : ''} required label={ind.label} color="primary" onChange={(e) => handleTextFieldChange(e.target.value, ind.id)} 
                                value =  {getValue('login',index)} />
                            )

                        }
                    </form>
                </DialogContent>
                <DialogActions>

                    <Grid container>
                        <Grid item md={6} lg={6} sm={6} xs={6} >
                            <StyledButton onClick={() => { resetFields(); setlogin(false);  handleRegister('register'); }} color="primary">
                                Register
                     </StyledButton>
                        </Grid>
                        <Grid item md={6} lg={6} sm={6} xs={6} >
                            <Grid container justify="flex-end" alignContent="center" >
                                <StyledButton color="primary" onClick={e => { resetFields(); setlogin(true);  handleRegister('login') ;}}>
                                    {!login ? 'Existing user' : ''}  Login
                             </StyledButton>
                            </Grid>
                        </Grid>
                    </Grid>

                </DialogActions>
            </Dialog>

        </div>
    );
}

function mapStateToProps(state) {
    return {
        loggedin: state.loggedin,
        registered: state.registered,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setRegister,
        isLoggedIn
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)

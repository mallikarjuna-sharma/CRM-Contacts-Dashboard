import React from 'react';
import {Drawer,Button} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MenuIcon from '@material-ui/icons/Menu';
import {Hidden,Grid} from '@material-ui/core';
import ContactsDashboard from '../src/components/ContactsDashboard.jsx'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose'
import Register from './components/popups/Register.jsx'
import {
    setRegister,getselectedContacts,getAvailableContacts,
    isLoggedIn,openAddPopup
} from './components/actions/index.jsx'
import { withStyles } from '@material-ui/core/styles';
import useStyles from '../src/components/styles.jsx'


function App(props) {
    const classes = useStyles();

    const logout =  () => {
        props.isLoggedIn([]);
        props.getselectedContacts([]);
        props.getAvailableContacts([]);
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


    return (
         (props.loggedin.length > 0) ?   <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" color={"default"} className={classes.appBar}>
                <Toolbar>
                <Grid
      justify="space-between" // Add it here :)
      container 
      spacing={24}
    >
      <Grid item>
      <Typography variant="h6" noWrap>
                        Hello ! {props.loggedin[0].name}
                    </Typography>
      </Grid>

      <Grid item>
      <StyledButton onClick={e => logout() } >
                        Logout
                     </StyledButton>
        
      </Grid>
    </Grid>

                   
                    
                </Toolbar>
            </AppBar>
            <Hidden smDown>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <List>
                    <ListItem button="true" >
                        <ListItemIcon>{<MenuIcon />}</ListItemIcon>
                    </ListItem>
                </List>
                <div className={classes.toolbar} />
                <List>
  
                        <ListItem button="true" >
                            <ListItemIcon><AddIcon onClick={e => props.openAddPopup(true) }/></ListItemIcon>
                        </ListItem>

                        <ListItem button="true" >  <ListItemIcon><EditIcon/></ListItemIcon>                  </ListItem>
                        <ListItem button="true" >  <ListItemIcon><DeleteIcon/></ListItemIcon>                  </ListItem>
                </List>
            </Drawer>
            </Hidden>
          <main className={classes.content}>
                <div className={classes.toolbar} />
                <ContactsDashboard/>
            </main>
        </div>
        : <Register/>  
    );
}


function mapStateToProps(state) {
    return {
        loggedin: state.loggedin,
        registered: state.registered,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({    setRegister,getselectedContacts,getAvailableContacts,
        isLoggedIn ,openAddPopup }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
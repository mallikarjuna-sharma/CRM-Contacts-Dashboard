import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';

function SelectedContact(props) {

    const keys = ['Full Name','Email','Phone','Company','Address'];

    const getRandomColor = () =>  {
        var letters = 'BCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    }
    

    return (
        <React.Fragment>
                <Grid container spacing={2} style={{ backgroundColor: "#CBD0D0"}} justify="center" alignItems="center" direction="column" >
                    <Grid item md={12} lg={12} sm={12}   >
                        <Paper variant="contained" color="primary"
                            style={{ borderRadius: "50%", width: "65px", height: "65px", backgroundColor: getRandomColor() }}>
                            <Typography style={{ textAlign: "center",paddingTop: "35%"}}  >{
                            props.selectedContacts.length ?
                            props.selectedContacts[0].substring(0, 2) 
                             : 'AA'}</Typography>
                        </Paper>
                    </Grid>
                    {(props.selectedContacts) && props.selectedContacts.map((e,index) =><Grid key ={index} item md={12} lg={12} sm={12} >
                        <Grid container direction="row">
                        <Typography   >     {keys[index]} :  </Typography>
                        <Typography   >     {(e) ? " "+e : " Not Available"}     </Typography>
                        </Grid>
                    </Grid> )}

                </Grid>

        </React.Fragment>
    )
}

export default SelectedContact;

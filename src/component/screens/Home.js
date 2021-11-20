import React, { useState} from 'react'
import  { Grid, makeStyles, Paper}  from '@material-ui/core';
import { Height } from '@material-ui/icons';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin : theme.spacing(5),
        padding: theme.spacing(3),
        width: '60%',
        height: '300%'
    },
    searchInput: {
        width: '75%',
        marginLeft: '1.3%'
    },
    newButton: {
        position: 'absolute',
        right: '10px',
        marginRight: '2.3%'
        
    }
}))

export default function Home() {

    const classes=useStyles();

    return (
        <>
            <Grid container>
                <Grid item xs={6}>
                <Paper 
                    className={classes.pageContent}
                >
                    
                </Paper>
                </Grid>

                <Grid item xs={6}>
                <Paper 
                    className={classes.pageContent}
                >
                </Paper>
                </Grid>
            </Grid>
        </>
    )
}

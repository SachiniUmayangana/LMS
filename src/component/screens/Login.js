import { Paper, Grid, Icon  } from '@material-ui/core';
import * as React from 'react';
import EmailSharpIcon from '@material-ui/icons/Email';
import LockSharpIcon from '@material-ui/icons/Lock';
import Button from '../Button'
import SignUp from './SignUp';


function Login() {

    const paperStyle={padding :20,height:'70vh',width:300, margin:"100px auto"}


    return (
        <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <h1 className='header'>Sign In</h1>   
                    
                    
                    <form className='login-form' >
                        <div className='control'>
                        <EmailSharpIcon style={{ fill: '#C8A2C8' }}/>
                            <label> E-mail</label>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" aria-label=""/>
                            </div> 
                        </div>

                        <div className='control'>
                            <LockSharpIcon style={{ fill: '#C8A2C8' }}/>
                            <label> Password</label>
                            <div class="input-group mb-3">
                                <input type="password" class="form-control" aria-label=""/>
                            </div> 
                        </div>

                        <label className = 'lbl'> Forgot Password?</label>

                    </form>

                    <Button text='Sign In'/>  

                    <label className = 'lbl'> Don't have an account?   | </label>
                    <label className = 'lblSignUp' to = '/'> Sign Up</label>
                    
                </Paper>
            </Grid>
    )
}

export default Login

import React, { useEffect} from 'react'
import {useForm, Form} from '../useForm';
import  { Grid, }  from '@material-ui/core';
import Controls from '../controls/Controls';

const initialFValues = {
    id: 0,
    name: '',
    username: '',
    email: '',
}

export default function MockForm(props) {
    
    const {addOrEdit, recordForEdit} = props

    const {
        values,
        setValues,
        handleInputChange,
        resetForm,
    } = useForm(initialFValues);


    const handleSubmit = e => {
        e.preventDefault()
        addOrEdit(values, resetForm);
    }


     useEffect(()=>{
         if(recordForEdit != null)
         setValues({
             ...recordForEdit
         })
     },[recordForEdit])


    return (
        <Form>               
        <Grid container>
           <Grid item xs={6}>
                    <Controls.Input
                        name="id"
                        label=" Id"
                        value={values.id}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="name"
                        label=" Name"
                        value={values.name}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Username"
                        name="username"
                        value={values.username}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>  
                     <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" 
                            onClick={handleSubmit} 
                            />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} 
                            />
                    </div> 
                </Grid>
               
           
        </Grid>
        </Form>
    )
}

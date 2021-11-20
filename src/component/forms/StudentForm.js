import React, { useEffect} from 'react'
import {useForm, Form} from '../useForm';
import  { Grid,}  from '@material-ui/core';
import Controls from '../controls/Controls';

const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

const initialFValues = {
    id: 0,
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    gender: 'male',
    guardianContact: '',
}

export default function StudentForm(props) {

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
                        name="fullName"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Mobile"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="City"
                        name="city"
                        value={values.city}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>  
                    <Controls.Input
                        label="Guardian Contact"
                        name="guardianContact"
                        value={values.guardianContact}
                        onChange={handleInputChange}
                    />
                    <Controls.RadioGroup
                            name="gender"
                            label="Gender"
                            value={values.gender}
                            onChange={handleInputChange}
                            items={genderItems}
                        />
                   
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

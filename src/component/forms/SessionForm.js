import React, {useEffect}  from 'react'
import {useForm, Form} from '../useForm';
import  { Grid, }  from '@material-ui/core';
import Controls from '../controls/Controls';
// import * as sessionService  from'../services/SessionService';


const initialFValues = {
    id: 0,
    sessionName: '',
    courseId: '',
    lecturerName: '',
    date: new Date(),
}

export default function SessionForm(props) {

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
                        name="sessionName"
                        label="Session Name"
                        value={values.sessionName}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Course"
                        name="courseId"
                        value={values.courseId}
                        onChange={handleInputChange}
                    />
                

                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Lecturer Name"
                        name="lecturerName"
                        value={values.lecturerName}
                        onChange={handleInputChange}
                    />

                     <Controls.DatePicker
                        name="date"
                        label="Date"
                        value={values.date}
                        onChange={handleInputChange}
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

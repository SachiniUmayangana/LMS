import React, {useEffect}  from 'react'
import {useForm, Form} from '../useForm';
import  { Grid,}  from '@material-ui/core';
import Controls from '../controls/Controls';
import * as courseService from '../services/CourseService';


const initialFValues = {
    id: 0,
    courseName: '',
    duration: '',
    courseFee: '',
    noOfSubjects: '',
    departmentId: '',
}

export default function CourseForm(props) {

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
                        name="courseName"
                        label="Course Name"
                        value={values.courseName}
                        onChange={handleInputChange}
                    />

                <Controls.Input
                        name="duration"
                        label="Duration"
                        value={values.duration}
                        onChange={handleInputChange}
                    />

                <Controls.Input
                        name="courseFee"
                        label="Course Fee"
                        value={values.courseFee}
                        onChange={handleInputChange}
                    />               
                </Grid>
                <Grid item xs={6}>
                <Controls.Input
                        name="noOfSubjects"
                        label="No of Subjects"
                        value={values.noOfSubjects}
                        onChange={handleInputChange}
                    />  

                <Controls.Select
                        name="departmentId"
                        label="Department"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={courseService.getDepartmentCollection}
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

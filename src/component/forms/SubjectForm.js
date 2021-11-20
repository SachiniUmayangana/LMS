import React, {useEffect}  from 'react'
import {useForm, Form} from '../useForm';
import  { Grid, }  from '@material-ui/core';
import Controls from '../controls/Controls';
import * as subjectService from '../services/SubjectService'


const initialFValues = {
    id: 0,
    courseName: '',
    courseId: '',
    noOfHours: '',
}

export default function SubjectForm(props) {
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
                        name="subjectName"
                        label="Subject Name"
                        value={values.subjectName}
                        onChange={handleInputChange}
                    />

                    <Controls.Select
                        name="courseId"
                        label="Course"
                        value={values.courseId}
                        onChange={handleInputChange}
                        options={subjectService.getDepartmentCollection}
                    />
                    </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="noOfHours"
                        label="No of Hours"
                        value={values.noOfHours}
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

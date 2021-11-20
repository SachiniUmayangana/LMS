
import React, {useEffect}  from 'react'
import {useForm, Form} from '../useForm';
import  { Grid, }  from '@material-ui/core';
import Controls from '../controls/Controls';
import * as employeeService  from'../services/EmployeeService';


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
    departmentId: '',
    hireDate: new Date(),
    isPermanent: false,
}

export default function EmployeeForm(props) {

    // const[employee, setEmployee] = useState(initialFValues);

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
                        label="Employee Id"
                        value={values.id}
                        onChange={handleInputChange}
                    />
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
                    <Controls.RadioGroup
                        name="gender"
                        label="Gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                     <Controls.Select
                        name="departmentId"
                        label="Department"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection}
                    />
                     <Controls.DatePicker
                        name="hireDate"
                        label="Hire Date"
                        value={values.hireDate}
                        onChange={handleInputChange}
                    />
                     <Controls.CheckBox
                        name="isPermanent"
                        label="Permanent Employee"
                        value={values.isPermanent}
                        onChange={handleInputChange}

                    />
                     <Controls.Input
                        name="name"
                        label="name"
                        value={values.name}
                        onChange={handleInputChange}

                    />
                     <Controls.Input
                        name="price"
                        label="price"
                        value={values.price}
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

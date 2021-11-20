// import React, {useEffect}  from 'react'
// import {useForm, Form} from '../useForm';
// import  { Grid, }  from '@material-ui/core';
// import Controls from '../controls/Controls';


// const initialFValues = {
//     id: 0,
//     studentName: '',
//     hireDate: new Date(),
// }

// export default function AttendanceForm(props) {
    
//     const {addOrEdit, recordForEdit} = props

//     const {
//         values,
//         setValues,
//         handleInputChange,
//         resetForm,
//     } = useForm(initialFValues);


//     const handleSubmit = e => {
//         e.preventDefault()
//         addOrEdit(values, resetForm);
//     }


//      useEffect(()=>{
//          if(recordForEdit != null)
//          setValues({
//              ...recordForEdit
//          })
//      },[recordForEdit])
     
//     return (
//         <Form>               
//              <Grid container>
//                 <Grid item xs={6}>
//                 <Controls.Input
//                         name="studentName"
//                         label="Student Name"
//                         value={values.studentName}
//                         onChange={handleInputChange}
//                     />
//                 </Grid>
//                 <Grid item xs={6}>
//                     <Controls.DatePicker
//                         name="hireDate"
//                         label="Hire Date"
//                         value={values.hireDate}
//                         onChange={handleInputChange}
//                     />
//                 </Grid>
//                 <div>
//                         <Controls.Button
//                             type="submit"
//                             text="Submit" 
//                             onClick={handleSubmit} 
//                             />
//                         <Controls.Button
//                             text="Reset"
//                             color="default"
//                             onClick={resetForm} 
//                             />
//                     </div>      
//             </Grid>
//         </Form>
//     )
// }

// import React, {useState} from 'react'
// import PageHeader from '../PageHeader'
// import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
// import { InputAdornment, makeStyles,  Toolbar,  } from '@material-ui/core';
// import * as attendanceService from '../services/AttendanceService';
// import useTable from '../useTable';
// import AttendanceForm from '../forms/AttendanceForm';
// import Controls from '../controls/Controls';
// import Search from '@material-ui/icons/Search';
// import Add from '@material-ui/icons/Add';
// import Notification from '../Notification';
// import ConfirmDialog from '../ConfirmDialog';
// import Popup from '../Popup';


// const useStyles = makeStyles(theme => ({
//     pageContent: {
//         margin : theme.spacing(5),
//         padding: theme.spacing(3),
//     },
//     searchInput: {
//         width: '75%',
//         marginLeft: '1.3%'
//     },
//     newButton: {
//         position: 'absolute',
//         right: '10px',
//         marginRight: '2.3%'
//     }
// }))

// const headCells = [
//     {id: 'studentName', label:'Student Name'},
//     {id: 'date', label:'Date'},
//     {id: 'actions', label:'Actions', disableSorting:true},
// ]

// export default function Attendance() {
    
//     const classes = useStyles();
//     const [recordForEdit, setRecordForEdit] = useState(null)
//     const [records, setRecords] = useState(attendanceService.getAllattendances);
//     const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
//     const [openPopup, setOpenPopup] = useState(false)
//     const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
//     const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })


//     const{
//         TblContainer,
//         TblHead,
//         TblPagination,
//         recordsAfterPagingAndSorting
//     } =  useTable(records, headCells , filterFn);


//     const handleSearch = e => {
//         let target = e.target;
//         setFilterFn({
//             fn: items => {
//                 if (target.value == "")
//                     return items;
//                 else
//                     return items.filter(x => x.date.toLowerCase().includes(target.value))
//             }
//         })
//     }

//     const onDelete = id => {
//         setConfirmDialog({
//             ...confirmDialog,
//             isOpen: false
//         })
//         attendanceService.deleteattendance(id);
//         setRecords(attendanceService.getAllattendances())
//         setNotify({
//             isOpen: true,
//             message: 'Deleted Successfully',
//             type: 'error'
//         })
//     }



//     const addOrEdit = (attendance, resetForm) => {
//         if (attendance.id == 0)
//             attendanceService.insertAttendance(attendance)
//         else
//             attendanceService.updateAttendance(attendance)
//         resetForm()
//         setRecordForEdit(null)
//         setOpenPopup(false)
//         setRecords(attendanceService.getAllAttendances())
//         setNotify({
//             isOpen: true,
//             message: 'Submitted Successfully',
//             type: 'success'
//         })
//     }

//     const openInPopup = item => {
//         setRecordForEdit(item)
//         setOpenPopup(true)
//     }

//     return (
// <>
//             <PageHeader
//                 className={classes.pageHeader}
//                 title="Attendance Form"
//                 subTitle="Form with all Attendance Details"
//                 icon={<SupervisorAccountIcon/>}
//             />       

//                 <Toolbar>
//                     <Controls.Input
//                         label="Search Attendance"
//                         className={classes.searchInput}
//                         InputProps={{
//                             startAdornment: (<InputAdornment position="start">
//                                 <Search />
//                             </InputAdornment>)
//                         }}
//                         onChange={handleSearch}
//                     />
//                     <Controls.Button
//                         text="Add New"
//                         variant="outlined"
//                         className={classes.newButton}
//                         startIcon = {<Add/>}
//                         onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
//                          />
//                 </Toolbar>

//             {/* <Paper 
//             className={classes.pageContent}
//             >
//                 <TblContainer>
//                     <TblHead/>
//                     <TableBody>
//                         {
//                             recordsAfterPagingAndSorting().map(item =>
//                                 (<TableRow key={item.id}>
//                                     <TableCell>{item.studentName}</TableCell>
//                                     <TableCell>{item.date}</TableCell>
//                                     <TableCell>
//                                     <Controls.ActionButton
//                                             color="primary">
//                                         <EditOutLinedIcon 
//                                                 backgroundColor="white" 
//                                                 fontSize="small"
//                                                 onClick = {()=>{openInPopup(item)}}
//                                                 />                      
//                                         </Controls.ActionButton>

//                                         <Controls.ActionButton
//                                             color="secondary"
//                                             onClick={() => {
//                                                 setConfirmDialog({
//                                                     isOpen: true,
//                                                     title: 'Are you sure to delete this record?',
//                                                     subTitle: "You can't undo this operation",
//                                                     onConfirm: () => { onDelete(item.id) }
//                                                 })
//                                             }}>
//                                             <CloseIcon fontSize="small" />
//                                         </Controls.ActionButton>
//                                     </TableCell>
//                                 </TableRow>)
//                                 )
//                         }
//                     </TableBody>
//                 </TblContainer>
//                 <TblPagination/>
//             </Paper> */}
//             <Popup
//             openPopup = {openPopup}
//             setOpenPopup = {setOpenPopup}
//             title='Attendance Form'
//             >
//                  <AttendanceForm
//                     recordForEdit={recordForEdit}
//                     addOrEdit={addOrEdit} />
//             </Popup>
//             <Notification
//             notify={notify}
//             setNotify={setNotify}
//             />

//             <ConfirmDialog
//                 confirmDialog={confirmDialog}
//                 setConfirmDialog={setConfirmDialog}
//             />
//         </>

//     )
// }
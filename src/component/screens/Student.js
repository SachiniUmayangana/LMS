import React, {useState} from 'react'
import PageHeader from '../PageHeader'
import Face from '@material-ui/icons/Face';
import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar,  } from '@material-ui/core';
import * as Studentservice from '../services/StudentService'
import useTable from '../useTable';
import Controls from '../controls/Controls';
import Search from '@material-ui/icons/Search';
import Add from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import EditOutLinedIcon from '@material-ui/icons/Edit';
import Notification from '../Notification';
import ConfirmDialog from '../ConfirmDialog';
import Popup from '../Popup';
import StudentForm from '../forms/StudentForm';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin : theme.spacing(5),
        padding: theme.spacing(3),
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

const headCells = [
    {id: 'fullName', label:'Student Name'},
    {id: 'email', label:'Email Address(Personal)'},
    {id: 'mobile', label:'Mobile'},
    {id: 'city', label:'City'},
    {id: 'guardianContact', label:'Guardian Contact'},
    {id: 'actions', label:'Actions', disableSorting:true},
]

export default function Student() {
    
    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(Studentservice.getAllStudents);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const{
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } =  useTable(records, headCells , filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value))
            }
        })
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        Studentservice.deleteStudents(id);
        setRecords(Studentservice.getAllStudents())
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }

    const addOrEdit = (employee, resetForm) => {
        if (employee.id === 0)
            Studentservice.insertStudent(employee)
        else
            Studentservice.updateStudents(employee)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(Studentservice.getAllStudents())
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }




    return (
        <>
            <PageHeader
                className={classes.pageHeader}
                title="Student Form"
                subTitle="Form with all Student Details"
                icon={<Face/>}
            />

                <Toolbar>
                    <Controls.Input
                        label="Search Students"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        className={classes.newButton}
                        startIcon = {<Add/>}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                         />
                </Toolbar>


                <Paper 
            className={classes.pageContent}
            >
                <TblContainer>
                    <TblHead/>
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.fullName}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.mobile}</TableCell>
                                    <TableCell>{item.city}</TableCell>
                                    <TableCell>{item.guardianContact}</TableCell>

                                    <TableCell>
                                    <Controls.ActionButton
                                            color="primary">
                                        <EditOutLinedIcon 
                                                backgroundColor="white" 
                                                fontSize="small"
                                                onClick = {()=>{openInPopup(item)}}
                                                />                      
                                        </Controls.ActionButton>

                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item.id) }
                                                })
                                            }}>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>

                                </TableRow>)
                                )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination/>
            </Paper>


            <Popup
                openPopup = {openPopup}
                setOpenPopup = {setOpenPopup}
                title='Employee Form'
            >
                 <StudentForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />

            </Popup>
            <Notification
            notify={notify}
            setNotify={setNotify}
            />

            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />




        </>
    )
}

import React, {useState} from 'react'
import PageHeader from '../PageHeader'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar,  } from '@material-ui/core';
import * as courseService from '../services/CourseService'
import useTable from '../useTable';
import CourseForm from '../forms/CourseForm';
import Controls from '../controls/Controls';
import Search from '@material-ui/icons/Search';
import Add from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import EditOutLinedIcon from '@material-ui/icons/Edit';
import Notification from '../Notification';
import ConfirmDialog from '../ConfirmDialog';
import Popup from '../Popup';

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
    {id: 'courseName', label:'Course Name'},
    {id: 'duration', label:'Duration '},
    {id: 'noOfSubjects', label:'No Of Subjects'},
    {id: 'department', label:'Department'},
    {id: 'actions', label:'Actions', disableSorting:true},
]


export default function Course() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(courseService.getAllCourses);
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
                    return items.filter(x => x.courseName.toLowerCase().includes(target.value))
            }
        })
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        courseService.deleteCourses(id);
        setRecords(courseService.getAllCourses())
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }


    const addOrEdit = (course, resetForm) => {
        if (course.id === 0)
            courseService.insertCourse(course)
        else
            courseService.updateCourse(course)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(courseService.getAllCourses())
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
            title="Course Form"
            subTitle="Form with all Course Details"
            icon={<SupervisorAccountIcon/>}
        />       

            <Toolbar>
                <Controls.Input
                    label="Search courses"
                    className={classes.searchInput}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
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
                                <TableCell>{item.courseName}</TableCell>
                                <TableCell>{item.duration}</TableCell>
                                <TableCell>{item.noOfSubjects}</TableCell>
                                <TableCell>{item.department}</TableCell>
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
        title='course Form'
        >
             <CourseForm
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

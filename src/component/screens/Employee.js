import React, {useState, useEffect} from 'react'
import PageHeader from '../PageHeader'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { InputAdornment, makeStyles, Paper, TableBody, TableCell,  TableRow, Toolbar,  } from '@material-ui/core';
import * as employeeService from '../services/EmployeeService'
import useTable from '../useTable';
import EmployeeForm from '../forms/EmployeeForm';
import Controls from '../controls/Controls';
import Search from '@material-ui/icons/Search';
import Add from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import EditOutLinedIcon from '@material-ui/icons/Edit';
import Notification from '../Notification';
import ConfirmDialog from '../ConfirmDialog';
import Popup from '../Popup';
import axios from 'axios';


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
    {id: 'id', label:'Employee Id'},
    {id: 'fullName', label:'Employee Name'},
    {id: 'email', label:'Email Address(Personal)'},
    {id: 'mobile', label:'Mobile'},
    {id: 'city', label:'City'},
    {id: 'actions', label:'Actions', disableSorting:true},
]

export default function Employee() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)

    const [records, setRecords] = useState([]);
  
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    // rrrrrrr
    const getRecordData = async () => {
        try {
            const data = await axios.get(
              "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
            );
            console.log(data.data);
            setRecords(data.data);
          } catch (e) {
            console.log(e);
          }
    };

    useEffect(() => {
        getRecordData();
       
    }, [])

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
        employeeService.deleteEmployee(id);
        setRecords(employeeService.getAllEmployees())
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }


    const addOrEdit = (employee, resetForm) => {
        if (employee.id === 0)
        axios.post("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline", {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(resp =>{
            console.log("Status: ", resp.status);
            console.log("Data: ", resp.data)
        })
            // employeeService.insertEmployee(employee)
        else
            employeeService.updateEmployee(employee)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(employeeService.getAllEmployees())
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
                title="Employee Form"
                subTitle="Form with all Employee Details"
                icon={<SupervisorAccountIcon/>}
            />       
                <Toolbar>
                    <Controls.Input
                        label="Search Employees"
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
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    {/* <TableCell>{item.fullName}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.mobile}</TableCell>
                                    <TableCell>{item.city}</TableCell> */}
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
                 <EmployeeForm
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

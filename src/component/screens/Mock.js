import React, {useState, useEffect} from 'react'
import PageHeader from '../PageHeader'
import Face from '@material-ui/icons/Face';
import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar,  } from '@material-ui/core';
import useTable from '../useTable';
import MockForm from '../forms/MockForm';
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
    {id: 'id', label:'Student ID'},
    {id: 'name', label:'Name'},
    {id: 'username', label:'User Name'},
    {id: 'email', label:'E-mail'},
    {id: 'actions', label:'Actions', disableSorting:true},
]

export default function Mock() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState([]);
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
                    return items.filter(x => x.name.toLowerCase().includes(target.value))
            }
        })
    }

    const getAll = async () => {
        await fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => setRecords(data))
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getAll();
    }, [records])


      const deleteMock = async (id) => {
        console.log("delete mock")
        await fetch(`https://jsonplaceholder.typicode.com/users/` + id, {
            method: "DELETE",
        })
            .then((res) => {
                if(res){
                    console.log(res)
                    getAll()
                }
                // setRecords(getAll())
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        deleteMock(id);
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }


    const addMock = async (recs) => {
        console.log(recs.id)
        await fetch("https://jsonplaceholder.typicode.com/users", {
            method: "POST",
            body: JSON.stringify({
                "id": recs.id,
                "name": recs.name,
                "username": recs.username,
                "email": recs.email,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })          
            .then((data) => {
                console.log(data)
                getAll()
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const updateMock = async () => {
        await fetch("https://jsonplaceholder.typicode.com/users", {
            method: "PUT",
            body: JSON.stringify({
                // "id": id,
                // "name": name,
                // "username": username,
                // "email": email,
    }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((data) => {
                console.log(data)
                getAll()
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const addOrEdit = (records, resetForm) => {
        console.log(records)
        if (records.id !== 0)
           addMock(records);
        else
            updateMock(records);
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(getAll())
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
                    title="Mock Form"
                    subTitle="Form with all Mock Details"
                    icon={<Face/>}
                />
    
                    <Toolbar>
                        <Controls.Input
                            label="Search Mocks"
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
                                        <TableCell>{item.username}</TableCell>
                                        <TableCell>{item.email}</TableCell>
    
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
                    title='records Form'
                >
                     <MockForm
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
    
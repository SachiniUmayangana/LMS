import React from 'react'
import {withStyles, Grid} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import FaceIcon from '@material-ui/icons/Face';
import { Link } from "react-router-dom";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LaptopChromebookSharpIcon from '@material-ui/icons/LaptopChromebookSharp';
import ClassSharpIcon from '@material-ui/icons/ClassSharp';

const style = {
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '320px',
        height: '100%',
        backgroundColor: '#C8A2C8',
        borderRadius  :'30px',
    }
}

// fffff

const SideMenu = (props) => {
    const { classes } = props;
    return (
        <Grid >  
        <div className={classes.sideMenu}>
        <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">KWD College Dashboard</h3>
          <ul className="sidebarList">

          <Link to="/" style={{ textDecoration: 'none' }}>
          <li className="sidebarListItem active">
            <HomeIcon className="sidebarIcon" />
                Home
          </li>
          </Link> 
          
          <Link to="/employee" style={{ textDecoration: 'none' }}>
              <li className="sidebarListItem">
              <SupervisorAccountIcon className="sidebarIcon" />
              Employee
            </li>
            </Link>

            <Link to="/student" style={{ textDecoration: 'none' }}>
            <li className="sidebarListItem">
              <FaceIcon className="sidebarIcon" />
              Students
            </li>
            </Link>

          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarSubTitle">Academic</h3>
          <ul className="sidebarList">

            <Link to="/course" style={{ textDecoration: 'none' }}>
            <li className="sidebarListItem active">
              <MenuBookIcon className="sidebarIcon" />
              Course
              </li>
              </Link>

            <Link to="/subject" style={{ textDecoration: 'none' }}>
            <li className="sidebarListItem">
              <LibraryBooksIcon className="sidebarIcon" />
              Subjects
            </li>
            </Link>

          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarSubTitle">Regular Tasks</h3>
          <ul className="sidebarList">

          <Link to="/session" style={{ textDecoration: 'none' }}>
          <li className="sidebarListItem active">
              <ClassSharpIcon className="sidebarIcon" />
              Sessions
              </li>
              </Link>

            <Link to="/mock" style={{ textDecoration: 'none' }}>
              <li className="sidebarListItem">
              <SupervisorAccountIcon className="sidebarIcon" />
              Mock
            </li>  
            </Link>
          </ul>
        </div>

        
      </div>
        </div>
        </Grid>
    )
}

export default withStyles(style)(SideMenu);

import { makeStyles, CssBaseline  } from '@material-ui/core';
import Header from '../component/Header';
import SideMenu from '../component/SideMenu';
import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { Routes ,Route } from 'react-router-dom';
import Home from '../component/screens/Home';
import Employee from '../component/screens/Employee';
import Student from '../component/screens/Student';
import Course from '../component/screens/Course';
import Subject from '../component/screens/Subject';
import Session from '../component/screens/Session';
import Mock from '../component/screens/Mock'


const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%',
    backgroundcolor: 'white'
  }
})

function App() {

  const classes = useStyles();

  return (

    <>
      <Router>
        {/* <Login/>
        <SignUp/> */}
      <SideMenu />

      <div className={classes.appMain}>

        <Header />
                {/* <Employee/> 
                <Student/> */}
                <Routes>
                  <Route path="/" element={<Home />}>
                    </Route>
                    
                    <Route path="/employee" element={<Employee />}>
                    </Route>

                    <Route path="/student" element={<Student />}>
                    </Route>

                    <Route path="/course" element={<Course />}>
                    </Route>

                    <Route path="/subject" element={<Subject />}>
                    </Route>

                    <Route path="/session" element={<Session />}>
                    </Route>
                    
                    <Route path="/mock" element={<Mock />}>
                    </Route>

                </Routes>             
          
      </div>
      </Router>
      
      {/* Adds common css rules  */}
      <CssBaseline />
    </>

    // <MockForm/>
  );
}

export default App;

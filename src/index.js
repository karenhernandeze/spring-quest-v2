import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import MainPage from './layouts/MainPage/mainPage'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/Header/Header'
import Footer from './components/Footer/footer'
import NewProject from './layouts/NewProject/newProject'
import NewProjectStepTwo from './layouts/NewProject/newProjectStepTwo';
import NewProjectStepThree from './layouts/NewProject/newProjectStepThree';
import NewProjectStepFour from './layouts/NewProject/newProjectStepFour';
import NewProjectStepFive from './layouts/NewProject/newProjectStepFive';
import { useLocation } from 'react-router-dom';
import GetInvolved from './layouts/GetInvolved/getInvolved';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Routing = (props) => {
  const pathname = window.location.pathname 
  console.log(pathname)
  return (
    <>
      {/* <div className={ (pathname==("/main" || "/getInvolved")) ? "containerMainPage" : "containerMain"}> */}
      <div className={ (pathname==("/getInvolved")) ? "containerMainPage" : "containerMain"}>
        <Router>
          {/* <div className={ (pathname==("/main" || "/getInvolved")) ? "containerHeaderMain" : "containerHeader"}> */}
          <div className={ (pathname==("/getInvolved")) ? "containerHeaderMain" : "containerHeader"}>
            <Header/>
          </div>
          <div className="containerBody">
            <Switch>
              {/*LOGIN*/}
              <Route path="/" exact component={App} />
              {/*Main Page - Spring Quest*/}
              <Route path="/main" exact component={MainPage} />
              {/*Get Involved */}
              <Route path="/getInvolved" exact component={GetInvolved} />
              {/*Create New Step One*/}
              <Route path="/create/one" exact component={NewProject} />
              {/*Create New Step Two*/}
              <Route path="/create/two" exact component={NewProjectStepTwo} />
              {/*Create New Step Three*/}
              <Route path="/create/three" exact component={NewProjectStepThree} />
              {/*Create New Step Four*/}
              <Route path="/create/four" exact component={NewProjectStepFour} />
              {/*Create New Step Five*/}
              <Route path="/create/five" exact component={NewProjectStepFive} />
            </Switch>
          </div>
          <div className="containerBottom">
            <Footer />
          </div>
        </Router>
      </div>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);
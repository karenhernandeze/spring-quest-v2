import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styles from './headerStyle.css'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Row'
import SearchIcon from '@material-ui/icons/Search';
import VisibilityIcon from '@material-ui/icons/Visibility';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: ""
    }
    this.headerLinks = this.headerLinks.bind(this)
  }

  componentDidMount(){
    window.addEventListener("scroll", this.handleScroll);
  }
  
  handleScroll=()=>{
    if (window.pageYOffset > 0) {
        if(!this.state.className){
          this.setState({ className: "changeBackground" });   
        }
    }else{
        if(this.state.className){
          this.setState({ className: "" });
        }
    }
   
  }

  headerLinks(id) {
    console.log(id)
    if (id == "SpringQuest") {
      this.props.history.push({
        pathname: '/main'
      })
    } else if ( id == "getInvolved"){
        this.props.history.push({
        pathname: '/getInvolved'
      })

    } else if ( id == "account"){
      this.props.history.push({
      pathname: '/'
    })

  } 

  }
  render() {
    return (
      <div className={`headerContainer ${this.state.className}`}>
        <Row style={{ width: "25%" }}>
          <Col>
            <Button class={"button"} onClick={() => this.headerLinks("SpringQuest")}>
              <b>
                Spring <br /> Quest
              </b>
            </Button>
          </Col>
        </Row>
        <Row style={{ width: "15%" }}>
          <Col>
            <Button class={"button"} style={{ fontStyle: "italic" }}  onClick={() => this.headerLinks("getInvolved")}>
              <b>
                get involved
              </b>
            </Button>
          </Col>
        </Row>
        <Row style={{ width: "30%" }}>
          <Col>
            <Button class={"button"} style={{ fontStyle: "italic" }} onClick={() => this.headerLinks("ourQuest")}>
              <b>
                our Quest
              </b>
            </Button>
          </Col>
        </Row>
        <Row style={{ width: "5%" }}>
          <Col>
            <Button class={"button"} onClick={() => this.headerLinks("view")}>
              <VisibilityIcon />
            </Button>
          </Col>
        </Row>
        <Row style={{ width: "5%" }}>
          <Col>
            <Button class={"button"} onClick={() => this.headerLinks("search")}>
              <SearchIcon />
            </Button>
          </Col>
        </Row>
        <Row style={{ width: "10%" }}>
          <Col>
            <Button class={"buttonAccount"} onClick={() => this.headerLinks("account")}>
              <b>
                Account
              </b>
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(Header)
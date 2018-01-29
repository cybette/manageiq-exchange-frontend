import React from 'react';
//import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Col, Image, Glyphicon } from 'react-bootstrap';
import {
  HorizontalNav,
  HorizontalNavHeader,
  NavBrand,
  HorizontalCollapse
} from '../Navigation';
import { ListGroup, ListGroupItem, MenuItem, DropdownButton } from 'patternfly-react';
import { Link } from 'react-router';
import GitHubLogin from './GitHubLogin/GitHubLogin';
import config from '../../config'
import FaGitlab from 'react-icons/lib/fa/gitlab';
import FaKey from 'react-icons/lib/fa/key';
import FaRefresh from 'react-icons/lib/fa/refresh';
import FaSpinner from 'react-icons/lib/fa/spinner';
import Api from '../../service/Api'

import './style.css';



export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.UserLogged  = this.UserLogged.bind(this);
    this.UserLogging = this.UserLogging.bind(this);
    this.UserLogOut  = this.UserLogOut.bind(this);
    this.postSpins = this.postSpins.bind(this);
    var user = ""
    var ava = ""
    var logged = false
    if (typeof(sessionStorage) !== 'undefined') {
      if (sessionStorage.getItem('github_login')){
          logged=true,
          user=sessionStorage.getItem('github_login'),
          ava=sessionStorage.getItem('github_avatar_url')
      }
    }
    this.state = {
      logged: logged,
      logging: false,
      username: user,
      avatar: ava
    };
  }

  UserLogged(){
    this.setState({
      logging: false,
      logged: true,
      username: sessionStorage.getItem('github_login'),
      avatar: sessionStorage.getItem('github_avatar_url')
    })
  }
  UserLogging(value){
    this.setState({
      logging: value})
  }
  postSpins(){
    Api.RefreshSpin()
    .then(response => {
        if(response.status == 200){
          console.log(response)
        }else{
          console.log("ERROR "+response)
        }
    })
    .catch(error => {
        console.log(error)
    });
  }
  UserLogOut(){
    Api.SignOut()
    .then(response => {
        if(response.status == 200){
          this.setState({logged:false})
          console.log("Logout")
          sessionStorage.clear()
        }else{
          console.log("ERROR "+response)
        }
    })
    .catch(error => {
        console.log(error)
    });

  }

  render() {
    const title ="Login";
    return (
      <div>
      <HorizontalNav >
        <HorizontalNavHeader>
          <NavBrand
            title="ManageIQ"
            href="/"
            iconImg="http://www.patternfly.org/assets/img/brand.svg"
          />
        </HorizontalNavHeader>
        <HorizontalCollapse>
          <ListGroup bsClass="nav navbar-nav navbar-primary">
            <ListGroupItem bsClass="">
              <a href="#0">ABOUT</a>
            </ListGroupItem>
            <ListGroupItem bsClass="">
              <a href="/explore/">EXPLORE</a>
            </ListGroupItem>
            <ListGroupItem bsClass="">
              <a href="/search/">SEARCH</a>
            </ListGroupItem>
            <ListGroupItem bsClass="">
              <a href="/authors/">BROWSE AUTHORS</a>
            </ListGroupItem>
            <ListGroupItem bsClass="">
              <a href="/signin/">SIGN IN</a>
            </ListGroupItem>
          </ListGroup>
          <ListGroup bsClass="nav navbar-nav navbar-utility">
            <ListGroupItem bsClass="">
            <DropdownButton bsStyle="link" title={title} key={1} id="dropdown-basic-1">
              <MenuItem eventKey="1">Github</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="4">Gitlab</MenuItem>
            </DropdownButton>
            </ListGroupItem>
          </ListGroup>
        </HorizontalCollapse>
      </HorizontalNav>
      </div>
    );
  }
}
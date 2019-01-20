import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import FooterAZ from './FooterAZ/'
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import DatabaseApi from '../../../src/services/dbApi'
import AuthApi from '../../../src/services/authApi'
import { setUserInfo } from '../../../src/redux/actions/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Footer extends Component {

  state = {
    user: {}
  }


  componentDidMount(){
    AuthApi.registerAuthObserver(async (user) => {
      console.log("​App -> componentDidMount -> user", user)
      let userData = null;
      if (user) {
        userData = await DatabaseApi.getDocumentById('user', user.uid);
        if(!userData){ 
          console.log("Please verify your Firebase setup");
        }
      } 
      this.props.setUser(userData);
      this.setState({user:userData, loading: false});
    });
  }


  logout = () => {
    const error = AuthApi.logout();

    if(!error){
      console.log("Some error occured");
    }
  }

  render() {

    const {user} = this.state
    console.log('--->user--->',user)

    return (
    <footer>
      <div className="foot-logo">
      <p>LAGASH LIBRARY</p>
      </div>
      <FooterAZ />
      <ul className="foot-bar">
        <li className="foot-links"><NavLink to='/'>Home</NavLink></li>
        <li className="foot-links"><NavLink to='/search'>Search</NavLink></li>
        {!user
          ? <li className="foot-links">
            <NavLink to='/login'>
              <FontAwesomeIcon icon="sign-in-alt" />
            </NavLink>
        </li>
          : <li className="foot-links icon-log">
            <NavLink to='' onClick={() => this.logout()}>
              <FontAwesomeIcon icon="sign-out-alt" />
            </NavLink>
          </li>  
        }
      </ul>
      
    </footer>

    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (userInfo) => { dispatch(setUserInfo(userInfo)) }
  }
}


export default withRouter(connect(null, mapDispatchToProps)(Footer));

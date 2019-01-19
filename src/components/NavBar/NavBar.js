import React, { Component } from 'react';
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import SearchForm from '../SearchForm/SearchForm'
import { connect } from 'react-redux';

import DatabaseApi from '../../../src/services/dbApi'
import AuthApi from '../../../src/services/authApi'
import { setUserInfo } from '../../../src/redux/actions/authActions';

class NavBar extends Component {

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
      console.log("Has salido mu bien");
    }
  }

  render() {

    const {user} = this.state
    console.log('we have the user',this.state.user)

    return (
    <div className="full-nav">
    <div className="navLinks foot-logo">
    <p>LAGASH LIBRARY</p>
    </div>
      <ul className="nav-bar">
        <li className="nav-links">
          <NavLink exact to='/' 
            activeStyle={activeCss}>
              Home
          </NavLink>
        </li>
        <li className="nav-links">
          <NavLink to='/search' 
            activeStyle={activeCss}>
              Search
          </NavLink>
          </li>
        <li className="nav-links">
          <NavLink to='/library' 
            activeStyle={activeCss}>
              Library
          </NavLink>
        </li>
        {!user
          ? <li className="nav-links">
            <NavLink to='/login' 
              activeStyle={activeCss}>
                LogIn
            </NavLink>
        </li>
          : <li className="nav-links">
            <NavLink to='' onClick={() => this.logout()}>
                LogOut
            </NavLink>
          </li>  
        }
      </ul>
      <SearchForm />
    </div>

    
    );
  }
}

const activeCss = {backgroundColor: '#de774e', color: 'white'}


const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (userInfo) => { dispatch(setUserInfo(userInfo)) }
  }
}


export default withRouter(connect(null, mapDispatchToProps)(NavBar));


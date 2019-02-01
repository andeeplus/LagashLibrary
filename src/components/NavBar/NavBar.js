import React, { Component } from 'react';
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import SearchForm from '../SearchForm/SearchForm'

import { connect } from 'react-redux';
import DatabaseApi from '../../../src/services/dbApi'
import AuthApi from '../../../src/services/authApi'
import { setUserInfo } from '../../redux/actions/authActions'
import { setExchange } from '../../redux/actions/exchangeAction'
import { setFavo } from '../../redux/actions/favoAction'

class NavBar extends Component {

  state = {
    user: {},
    loading: true
  }

  componentDidMount(){
 
    this.props.setExchange()

    AuthApi.registerAuthObserver(async (user) => {
     
      let userData = null;
      if (user) {
        userData = await DatabaseApi.getDocumentById('user', user.uid);
        if(!userData){ 
          console.log("Please verify your Firebase setup");
        }
      } 

      this.props.setUser(userData);
      this.setState({user:userData, loading: false},
        () => {user && this.props.setFavo(this.state.user.id)}
        );
    });

  }

  render() {

    const {user} = this.state
    

    return (

      !this.state.loading && 
    <div className="full-nav">
    <div className="logo-ll">
      <NavLink exact to='/'>
      <p>LAGASH LIBRARY</p>
    </NavLink>

    </div>
      <ul className="nav-bar">
        <li className="nav-links">
          <NavLink to='/home' 
            activeStyle={activeCss}>
              Home
          </NavLink>
        </li>
        <li className="nav-links">
          <NavLink to='/about' 
            activeStyle={activeCss}>
              About
          </NavLink>
        </li>
        {!user
          ? <li className="nav-links">
          <NavLink to='/login'>
            LogIn
          </NavLink>
          </li>
          : <li className="nav-links">
            <NavLink to={`/user/${user.id}`}>
                Profile
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
    setUser: (userInfo) => { dispatch(setUserInfo(userInfo)) },
    setExchange: () => { dispatch(setExchange()) },
    setFavo: (userInfo) => { dispatch(setFavo(userInfo)) }
  }
}


export default withRouter(connect(null, mapDispatchToProps)(NavBar));


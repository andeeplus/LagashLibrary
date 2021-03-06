import React, { Component } from 'react';
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

import { connect } from 'react-redux';
import DatabaseApi from '../../../src/services/dbApi'
import AuthApi from '../../../src/services/authApi'
import { setUserInfo } from '../../../src/redux/actions/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class UserArea extends Component {

  state = {
    user: {}
  }

  componentDidMount(){
    AuthApi.registerAuthObserver(async (user) => {

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


  render() {

    const {user} = this.state
    return (
      <div className="icon-menu">
      <div className="icon-menu-item">
      <NavLink exact to={`/user/${user.id}/personal-detail`}>
      <FontAwesomeIcon className="icon-svg" icon="user" />
        </NavLink>
        <p>Your Details</p>
      </div>
      <div className="icon-menu-item">
      <NavLink to={`/user/${user.id}/your-favourites`}>
      <FontAwesomeIcon className="icon-svg" icon="heart" />
        </NavLink>
        <p>Favourites</p>
      </div>
      <div className="icon-menu-item">
      <NavLink to={`/user/${user.id}/messages`}>
      <FontAwesomeIcon className="icon-svg" icon="envelope" />
        </NavLink>
        <p>Messages</p>
      </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (userInfo) => { dispatch(setUserInfo(userInfo)) }
  }
}


export default withRouter(connect(null, mapDispatchToProps)(UserArea));






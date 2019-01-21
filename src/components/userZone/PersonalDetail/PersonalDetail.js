import React, { Component } from 'react';
import { NavLink } from 'react-router-dom' 
import DatabaseApi from '../../../services/dbApi';
import AuthApi from '../../../services/authApi'
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { setUserInfo } from '../../../redux/actions/authActions'

class PersonalDetail extends Component {
  state = {
    name: '',
    lastName: '',
    eMail: '',
    password: '',
    userName: '',
    checkPassword: '',
    newPassword:'',
    user: {},
    permitsUpdate: false
    
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
      this.setState({user:userData});
    });

  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    this.setState({updateError: ''});
  }

  permitsUpdate = (e) => {

    this.setState({permitsUpdate: true})
  }

  render() {

    const {user,permitsUpdate} = this.state

    return (
      !permitsUpdate 
      ?<div className="signup-block">
        <form>
          <div className="loginContainer">
            <label htmlFor="fname"><b>Name</b></label>
              <input type="text" onChange={this.handleChange} id="name" value={user.name} required />
            <label htmlFor="lname"><b>Last Name</b></label>
              <input type="text" onChange={this.handleChange} id="lastName" value={user.lastName} required />
            <label htmlFor="email"><b>E-mail</b></label>
              <input type="email" onChange={this.handleChange} id="eMail" value={user.eMail} required />
            <label htmlFor="uname"><b>Username</b></label>
              <input type="text" id="userName" value={user.userName} required />
            </div>
            <button className="buttonSubmit" onClick={() => this.permitsUpdate()}>Need to update it?</button>
        </form>
      </div>

      :<div className="signup-block">
        <form onSubmit={this.handleSubmit}>
          <div className="loginContainer">
            <label htmlFor="fname"><b>Name</b></label>
              <input type="text" onChange={this.handleChange} id="name" placeholder={user.name} required />
            <label htmlFor="lname"><b>Last Name</b></label>
              <input type="text" onChange={this.handleChange} id="lastName" placeholder={user.lastName} required />
            <label htmlFor="email"><b>E-mail</b></label>
              <input type="email" onChange={this.handleChange} id="eMail" placeholder={user.eMail} required />
            <label htmlFor="uname"><b>Username</b></label>
              <input type="text" id="userName" placeholder={user.userName} required /> 
            <label htmlFor="psw"><b>Old Password</b></label>
              <input type="password" onChange={this.handleChange} id="password" placeholder="Old Password" required />
            <label htmlFor="psw"><b>New Password</b></label>  
              <input type="password" onChange={this.handleChange} id="newPassword" placeholder="New Password" required />
            <button className="buttonSubmit" type="submit">Submit Update</button>
          </div>
        </form>
        <div className="log-error">{this.state.updateError}</div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (userInfo) => { dispatch(setUserInfo(userInfo)) }
  }
}


export default withRouter(connect(null, mapDispatchToProps)(PersonalDetail));



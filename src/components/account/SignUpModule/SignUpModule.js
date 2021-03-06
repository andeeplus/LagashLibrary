import React, { Component } from 'react';
import { NavLink } from 'react-router-dom' 
import AuthApi from '../../../services/authApi'
import { connect } from 'react-redux';
import DatabaseApi from '../../../services/dbApi'
import { withRouter } from "react-router";

class SignUpModule extends Component {

  state = {
    name: '',
    lastName: '',
    eMail: '',
    password: '',
    userName: '',
    profilePic: 'https://tinyurl.com/yat4mufj',
    checkPassword: '',
    register: false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }


  async componentDidMount(){

    AuthApi.registerAuthObserver((user) => {

      if(!user) return; 


      const {uid} = user

      const {
        name,
        lastName,
        eMail,
        userName,
        profilePic,
      } = this.state

      const newUser = {
        name,
        lastName,
        eMail,
        userName,
        profilePic
      }
      if (this.state.register){
        DatabaseApi.createDocumentWithId('user', newUser, uid)
        console.log(uid)
        this.props.history.push(`/home`)
        
      }
      
  })


}
  handleSubmit = async (e) => {
    e.preventDefault()

    if (this.props.user){

      this.setState({registerError: 'Already logged in!'})

    } else { 

      this.setState({registerError: '', register: true});

      const { eMail, password, checkPassword } = this.state;
      let result;

      if (password === checkPassword){
        result = await AuthApi.signUp(eMail, password);
      } 

      if (password !== checkPassword){
        this.setState({registerError: 'Password do not match'})
      }

      if(result === 'auth/weak-password') {
        this.setState({registerError: 'Weak password, at least 6 characters!'})

      } else if(result === 'auth/email-already-in-use'){
        this.setState({registerError: 'Email already registered'})
      }
    }
  }

  render() {
    return (
      <div>
      <div className="signup-block">
        <form onSubmit={this.handleSubmit}>
          <div className="loginContainer">
            <label htmlFor="fname"><b>Name</b></label>
              <input type="text" onChange={this.handleChange}  id="name" placeholder="Enter Name" required />
            <label htmlFor="lname"><b>Last Name</b></label>
              <input type="text" onChange={this.handleChange} id="lastName" placeholder="Enter Last Name" required />
            <label htmlFor="email"><b>E-mail</b></label>
              <input type="email" onChange={this.handleChange} id="eMail" placeholder="Enter E-mail" required />
            <label htmlFor="uname"><b>Username</b></label>
              <input type="text" id="userName" onChange={this.handleChange} placeholder="Enter Username" required />
            <label htmlFor="psw"><b>Password</b></label>
              <input type="password" onChange={this.handleChange} id="password" autoComplete="password" placeholder="Enter Password" required />
              <input type="password" onChange={this.handleChange} id="checkPassword" autoComplete="check-password" placeholder="Confirm Password" required />
            <button className="buttonSubmit" type="submit">Sign Up</button>
            <div className="low-bar-form">
              <input type="checkbox" defaultChecked="checked" name="remember" /> 
              <p>Remember me</p>
              <NavLink to='/login'>Log In</NavLink>
            </div>
          </div>
        </form>
        <p>{this.state.registerError}</p>
      </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}


export default withRouter(connect(mapStateToProps)(SignUpModule));

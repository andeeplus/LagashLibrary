import React, { Component } from 'react';
import { NavLink } from 'react-router-dom' 
import AuthApi from '../../../services/authApi'
import { connect } from 'react-redux';
import { setUserInfo } from '../../../redux/actions/authActions';



class LogInModule extends Component {

  state = {
    eMail:'',
    password:'',
  }

  componentWillUnmount(){
    this.mounted = false;
  }


  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    this.setState({loginError: ''});

    const { eMail, password } = this.state;
    
    const result = await AuthApi.login(eMail, password);

    if(result.code) {
      this.setState({loginError: result.message})
    } else {
      this.props.history.push('home');
    }
  }


  render() {
    return (
      <div className="login-block">
        <form onSubmit={this.handleSubmit}>
          <div className="loginContainer">
            <label htmlFor="email"><b>E-mail</b></label>
              <input type="email" id="eMail" onChange={this.handleChange} placeholder="Enter E-Mail" required />
            <label htmlFor="psw"><b>Password</b></label>
              <input type="password" id="password" onChange={this.handleChange} placeholder="Enter Password" required />
            <button className="buttonSubmit" type="submit">Login</button>
            <div className="low-bar-form">
              <input type="checkbox" defaultChecked="checked" name="remember" /> 
              <p>Remember me</p>
              <NavLink to='/signup'>Sign Up</NavLink>
            </div>
              <span className="psw">Forgot <NavLink to='/recover'>password?</NavLink></span>
          </div>
        </form>
        <div className="log-error">{this.state.loginError}</div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (userInfo) => { dispatch(setUserInfo(userInfo)) }
  }
}

export default connect(null, mapDispatchToProps)(LogInModule);
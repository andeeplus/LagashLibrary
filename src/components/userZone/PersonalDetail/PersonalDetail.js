import React, { Component } from 'react';
import { NavLink } from 'react-router-dom' 
import DatabaseApi from '../../../services/dbApi';
import AuthApi from '../../../services/authApi'
import StorageApi from '../../../services/StorageApi'
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { setUserInfo } from '../../../redux/actions/authActions'
import noImg from '../../../img/noimgMan.svg'
class PersonalDetail extends Component {

  state = {
    name: '',
    lastName: '',
    eMail: '',
    password: '',
    userName: '',
    profilePic: '',
    checkPassword: '',
    newPassword:'',
    newName:'',
    newLastName:'',
    newUserName:'',
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
    this.updateUser()
  }

  permitsUpdate = (e) => {

    this.setState({permitsUpdate: !this.state.permitsUpdate})
  }

  updateUser = async () => {
    const { newName, newLastname, newUserName, user } = this.state;

    const result = await DatabaseApi.updateDocument('content', {
      name: newName,
      lastname: newLastname,
      userName: newUserName
    }, user.id);

    if(result){
      alert("Document Updated");
      this.setState({newName : '', newLastname  : '', newUserName : ''});
      this.props.history.goBack()
    }
  }

  updatePic = async () => {
    const { newProfilePic, user } = this.state;

    const result = await DatabaseApi.updateDocument('user', {
      profilePic: newProfilePic
    }, user.id);

    if(result){
      this.setState({newProfilePic : ''});
      this.fileInputRef.value = ''
    }
  }

  onFileSelected = (e) => {
    const file = e.target.files[0];
    StorageApi.uploadFile('userPics',file, (imageURL) => {
      this.setState({newProfilePic: imageURL});
      console.log(imageURL)
    });
  }

  render() {

    const {user,permitsUpdate} = this.state

    return (

      <div className="personal-block">
      <div className="pic-block">
      <figure>
        <img src={user.profilePic ? user.profilePic : noImg} alt="profilepic"/>
      </figure>
      <form className="app-form" onSubmit={this.updatePic}>
        <input type="file" onChange={(e) => { this.onFileSelected(e) }} ref={(ref) => {this.fileInputRef = ref}}/>
        <input type="submit" value="Save" />
      </form>
      </div>
      
      {!permitsUpdate 
      ?<div className="signup-block">
        <h1 className="title-pages">Your Details:</h1>
        <form>
          <div className="loginContainer">
              <p><b>Name:</b> {user.name}</p>
              <p><b>Last Name:</b> {user.lastName}</p>
              <p><b>E-mail:</b> {user.eMail}</p>
              <p><b>Username:</b> {user.userName}</p>
            </div>
            <button className="buttonSubmit" onClick={() => this.permitsUpdate()}>Need to update it?</button>
        </form>
      </div>

      :<div className="signup-block">
        <form onSubmit={() => this.handleSubmit()}>
          <div className="loginContainer">
            <label htmlFor="fname"><b>Name</b></label>
              <input type="text" onChange={this.handleChange} id="newName" placeholder={user.name} required />
            <label htmlFor="lname"><b>Last Name</b></label>
              <input type="text" onChange={this.handleChange} id="newLastName" placeholder={user.lastName} required />
            <label htmlFor="uname"><b>Username</b></label>
              <input type="text" onChange={this.handleChange} id="newUserName" placeholder={user.userName} required /> 
            <label htmlFor="psw"><b>Old Password</b></label>
              <input type="password" onChange={this.handleChange} id="password" placeholder="Old Password" required />
            <label htmlFor="psw"><b>New Password</b></label>  
              <input type="password" onChange={this.handleChange} id="newPassword" placeholder="New Password" required />
            <button className="buttonSubmit" type="submit">Submit Update</button>
            <button className="buttonGetBack" onClick={() => this.permitsUpdate()}>I've changed idea</button>
          </div>
        </form>
        <div className="log-error">{this.state.updateError}</div>
      </div>}
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



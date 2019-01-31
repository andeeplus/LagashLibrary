import React, { Component } from 'react';
import DatabaseApi from '../../../services/dbApi';
import StorageApi from '../../../services/StorageApi'
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { setUserInfo } from '../../../redux/actions/authActions'
import noImg from '../../../img/noimgMan.svg'
import Loading from '../../Loading/Loading'
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
    permitsUpdate: false,
    disabled: true
    
  }


  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  permitsUpdate = (e) => {

    this.setState({permitsUpdate: !this.state.permitsUpdate})
  }

  updateUser = async (e) => {
    e.preventDefault()
    const { newName, newLastName, newUserName } = this.state;

    const result = await DatabaseApi.updateDocument('user', {
      name: newName,
      lastName: newLastName,
      userName: newUserName
    }, this.props.user.id);

    if(result){
      alert("Document Updated");
      this.setState({newName : '', newLastname  : '', newUserName : ''});
      this.props.history.goBack()
    }
  }

  updatePic = async (e) => {
    e.preventDefault()
    const { newProfilePic } = this.state;
    const {user,setUser} = this.props

    const result = await DatabaseApi.updateDocument('user', {
      profilePic: newProfilePic
    }, user.id);

    if(result){
      setUser(Object.assign({...user}, {profilePic:newProfilePic}))
      this.setState({newProfilePic : ''});
      this.fileInputRef.value = ''
      
    }


  }

  onFileSelected = (e) => {
    const file = e.target.files[0];
    this.setState({disabled: true})
    StorageApi.uploadFile('userPics',file, (imageURL) => {
      this.setState({newProfilePic: imageURL, disabled:false});
    });
  }

  render() {

    const {permitsUpdate,disabled} = this.state
    const { user } = this.props


    return (

      !user 
      ? <Loading />
      :
      <div className="personal-block">
      <div className="pic-block">
      <figure>
        <img src={user.profilePic ? user.profilePic : noImg} alt="profilepic"/>
      </figure>
      <form className="app-form" onSubmit={this.updatePic}>
        <input type="file" onChange={(e) => { this.onFileSelected(e) }} ref={(ref) => {this.fileInputRef = ref}}/>
        <input type="submit" value="Save" disabled={disabled}/>
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
        <form onSubmit={this.updateUser}>
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

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (userInfo) => { dispatch(setUserInfo(userInfo)) }
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PersonalDetail));



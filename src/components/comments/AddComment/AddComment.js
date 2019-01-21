import React, { Component } from 'react';
import DatabaseApi from '../../../services/dbApi'
import AuthApi from '../../../services/authApi'
import { connect } from 'react-redux';
import { setUserInfo } from '../../../redux/actions/authActions'


class AddComment extends Component {
  state = {
    comment: '',
    userName: '',
    idLabel: '',
    idArtist: '',
    idMaster: '',
    idRelease: '',
    imgArticle: '',
    type: '',
    userId: '',
    user:{}
  }

  addDocs = (comment) => DatabaseApi.addDocument('comments',comment)


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
      this.setState({
        user:userData, 
        userName: userData.userName, 
        userId: userData.id,
      });
    });

    console.log(this.props, '<------------id artist?')

  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
    console.log(this.state)
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const{ 
      idLabel = this.props.id[0] === 'idLabel' ? this.props.id[1].toString() : '',
      idArtist = this.props.id[0] === 'idArtist' ? this.props.id[1].toString()  : '',
      idMaster = this.props.id[0] === 'idMaster' ? this.props.id[1].toString()  : '',
      idRelease = this.props.id[0] === 'idRelease' ? this.props.id[1].toString()  : '',
      type= ''} = this.props

    
    const commentUp = {
      comment: this.state.comment,
      userName: this.state.userName,
      userId: this.state.userId,
      idLabel,
      idArtist,
      idMaster,
      idRelease,
      type
    }
    console.log(this.props, '<------------id artist?')
    this.addDocs(commentUp)

  }


  render() {
    return (

      <form className="send-comment-box" onSubmit={this.handleSubmit}>
        <div className="addComment">
            <textarea id="comment" 
            onChange={this.handleChange} 
            placeholder="Write your comment here..." 
            required />
        <div className="comment-controls">
          <button className="buttonSend" type="submit">Send</button>
        </div>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (userInfo) => { dispatch(setUserInfo(userInfo)) }
  }
}

export default connect(null, mapDispatchToProps)(AddComment);
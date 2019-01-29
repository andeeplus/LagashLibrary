import React, { Component } from 'react';
import  DatabaseApi from '../../../services/dbApi'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Message extends Component {
  
  state = {
    user:null,
    answer: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = async () => {

    const getDate = new Date()
    const date = getDate.toLocaleString()
    const dateNow = Date.now()

    const {answer} = this.state
    const {message, user} = this.props

    const answerToSend = {
        message: answer,
        fromUser: user.id,
        userName: user.userName,
        date,dateNow
    }

    DatabaseApi.updateItemArrayIntoDoc('messages', message.id, 'message', ...answerToSend)
  }

  deleteMessage(){
    DatabaseApi.deleteDocumentWithId('messages', this.props.message.id)
  }

  componentDidMount(){

    DatabaseApi.getRealtimeDocument('messages',this.props.message.id, this.props.message.fromUser,
      (fbComments) => {
      this.setState({fbComments});})
  }

  chooseUser(userName){
    const {user} = this.props
    return userName === user.userName? 'user-left' : 'user-right'
  }

  choosePhoto(){
    const {message, user} = this.props
    return message.fromUser === user.id ? message.receiverPic : message.senderPic
  }


  render() {

    const {message} = this.props
    console.log(message)
    return (
      <div className="full-card-message">
      <FontAwesomeIcon onClick={() => this.deleteMessage(message.id)} className='big-x-message' icon='window-close'/>
      <div className='email-line'>
        <img src={this.choosePhoto()} alt={message.dateNow} />
        <p className='email-subject'><span>From: <strong>{message.userName}</strong> {message.title}</span></p>
        <p>{message.subject}</p>
      </div>
      <div className="body-message">
      { message.message.map( message => 
        <div key={message.dateNow} className={'single-message'}>
        <p className={this.chooseUser(message.userName)}>{message.message}</p>
        <p className='email-timestamp'>{message.date.split(',')[0]} <strong>{message.date.split(',')[1]}</strong></p>
        </div>
      )}
      <div className='write-message'>
        <textarea id="answer" className='message-textarea' onChange={this.handleChange} placeholder="Write a messages..." required />
        <FontAwesomeIcon className='send-answer' onClick={()=> this.handleSubmit()} icon='paper-plane'/>
      </div>
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


export default connect(mapStateToProps)(Message);



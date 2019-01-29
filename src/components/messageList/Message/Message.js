import React, { Component } from 'react';
import  DatabaseApi from '../../../services/dbApi'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Message extends Component {
  
  state = {
    user:null
  }

  deleteMessage(){
    DatabaseApi.deleteDocumentWithId('messages', this.props.message.id)
  }

  componentDidMount(){

    DatabaseApi.getRealtimeDocument('messages',this.props.message.id, this.props.message.fromUser,
      (fbComments) => {
      this.setState({fbComments});})
  }

  


  render() {

    const {message} = this.props

    return (
      <div className="full-card-message">
      <div className='email-line'>
        <img src={message.userImg} alt={message.dateNow} />
        <p className='email-subject'><strong>From: </strong>{message.userName} {message.title}</p>
        <p>{message.subject}</p>
      </div>
      <div className="body-message">
        <p>{message.message}</p>
        <p className='email-timestamp'>{message.date.split(',')[0]} <strong>{message.date.split(',')[1]}</strong></p>
        <FontAwesomeIcon className='send-answer' icon='paper-plane'/>
        </div>
        <FontAwesomeIcon onClick={() => this.deleteMessage(message.id)} className='big-x-message' icon='window-close'/>
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
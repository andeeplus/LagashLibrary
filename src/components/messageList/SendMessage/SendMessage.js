import React, { Component } from 'react';
import DatabaseApi from '../../../services/dbApi'

class SendMessage extends Component {

  state = {
    fromUser: '',
    userName: '',
    senderPic: '',
    subject: '',
    message:'',
    toUser:'',
    receiverPic:'',
    infoExchange:null
  }

  sendMessage = (messageToSend) => DatabaseApi.addDocument('messages', messageToSend)


  componentDidMount(){
    const {user,sendTo,infoExchange} = this.props
    this.setState({
      fromUser: user.id,
      userName: user.userName,
      senderPic: user.profilePic,
      receiverPic: infoExchange.receiverPic,
      toUser: sendTo,
      infoExchange
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const getDate = new Date()
    const date = getDate.toLocaleString()
    const dateNow = Date.now()

    const { 
      fromUser,
      userName,
      senderPic,
      subject,
      message,
      infoExchange,
      receiverPic,
      toUser
    } = this.state;
    
    const messageToSend = {
      fromUser,
      userName,
      senderPic,
      receiverPic,
      subject,
      message:[{message,date,dateNow,fromUser}],
      infoExchange,
      toUser
    }

    this.sendMessage(messageToSend)
    this.props.closeModal()
 
  }



  render() {
    return (
      <div className="send-message-box">
      <form onSubmit={this.handleSubmit}>
        <div className="message-block">
          <label htmlFor="message-title"><b>Title</b></label>
            <input type="text" id="subject" onChange={this.handleChange} placeholder="E-mail subject" required />
          <label htmlFor="message-detail"><b>Info Exchange</b></label>
            <textarea className="textexchange" id="message" onChange={this.handleChange} placeholder="Write an email..." required />
          <button className="buttonSubmit" type="submit">Submit</button>
        </div>
      </form>
      </div>
    );
  }
}



export default SendMessage;

import React, { Component } from 'react';
import Message from './Message/Message'
import  DatabaseApi from '../../services/dbApi'
import { connect } from 'react-redux';
import Loading from '../Loading/Loading'

class MessageList extends Component {

  state = {
    messages:null,
    user:null,
    loading: true
  }

  async componentDidMount(){
    const {user} = this.props
    const messages = await DatabaseApi.getDocument('messages', 'toUser', user.id)
    this.setState({messages, loading: false, user})
  }
  

  render() {

    const {messages, loading} = this.state

    return (
      loading
      ? <Loading />
      : !messages
      ? <p>No messages yet</p> 
      : <div className="message-list">
        { messages.map((i,index )=> <Message key={messages.id+index} message={i}/>)} 
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}


export default connect(mapStateToProps)(MessageList);




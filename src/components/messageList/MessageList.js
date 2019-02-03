import React, { Component } from 'react';
import Message from './Message/Message'
import  DatabaseApi from '../../services/dbApi'
import { connect } from 'react-redux';
import Loading from '../Loading/Loading'

class MessageList extends Component {

  state = {
    messagesFrom:[],
    messagesTo:[],
    user:null,
    loading: false
  }


  async componentDidMount(){
    const {user} = this.props
    const {messagesFrom, messagesTo} = this.state

    DatabaseApi.getRealtimeChat('messages', 'fromUser', user.id,
    (messagesFrom) => {this.setState({messagesFrom})})
    DatabaseApi.getRealtimeChat('messages', 'toUser', user.id,
    (messagesTo) => {this.setState({messagesTo})})
    if (messagesFrom !== [] && messagesTo !== []){
      this.setState({loading: false})
    }

  }

  

  render() {

    const {messagesFrom, messagesTo, loading} = this.state
    const messages = [...messagesFrom, ...messagesTo]

    return (
      loading
      ? <Loading />
      : messages !== []
      ? <p className="no-fav-yet">No messages yet</p> 
      : <div className="title-pages">
        { messages.map((i,index )=> <Message key={index} message={i}/>)} 
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




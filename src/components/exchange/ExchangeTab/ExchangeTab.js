import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';
import Loading from '../../../components/Loading/Loading'
import { truncateString } from '../../../services/helper'
import { Link } from 'react-router-dom'
import SendMessage from '../../messageList/SendMessage/SendMessage'
import Modal from "../../Modal/Modal";

class ExchangeTab extends Component {

  state = {exchangeItems: null, user: null, loading: true}

  state = {
    exchangeItems:[],
    modalShowMsg: false,
    sendEmailTo: '',
    infoExchange:'',
    disabled: true,
    user: null,
    loading: true
  }


  componentDidMount(){
    const {exchangeItems} = this.props
    this.setState({exchangeItems, loading: false})
    
  }


  showModal = e => {this.setState({modalShow: true})};
  onClose = e => {this.setState({modalShow: false})};

  showModalMsg = e => {this.setState({modalShowMsg: true})};
  onCloseMsg = e => {this.setState({modalShowMsg: false})};

  sendMessageToUser(info){
    this.setState({
      sendEmailTo: info.user,
      receiverPic: info.user.profilePic,
      infoExchange:{
        id: info.id, 
        artist:info.artist, 
        title: info.title, 
        catno: info.catno}
      }, () => this.showModalMsg() )
  }

  render() {

    const {exchangeItems, loading, modalShowMsg, sendEmailTo, infoExchange} = this.state
    const {user} = this.props

    return (
      loading 
      ? <Loading />
      : <div className="exchange-tab">
      <h1 className="page-h1">
      <FontAwesomeIcon style={{padding: '0', width: '0.7em', paddingRight: '5px'}} icon="exchange-alt" /> 
      Interchange<button 
      className="buttonAddArticle">View All</button></h1>
      {exchangeItems.map(i =>
        <div key={i.id} className="single-exchange">
        <div className="user-offer-block">
          <figure>
            <img src={i.userImg} alt={i.id + i.userName}/>
          </figure>
        <div className="user-icon-block">
        {user && <FontAwesomeIcon onClick={() => this.sendMessageToUser(i)} className="offer-icons" icon="envelope" />}
        </div>
        </div>
        <div className='single-exchange-text'>
        <div className="exchange-record">
        <Link to={`/record/releases/${i.idRelease}`}>
        <p>{i.artist} - {i.title} </p>
        <p>{truncateString(i.catno.split(',')[0],20)} • {truncateString(i.catno.split(',')[1],8)} </p>
        </Link>
        </div>
        <p className="exchange-title">{i.titleOffer}</p>
        <p className="exchange-desc">{i.offerDetail}</p>
        </div>
        </div>
      )}
        <Modal 
          onClose={this.onCloseMsg} 
          show={modalShowMsg} 
          trigger={<SendMessage user={user} sendTo={sendEmailTo} infoExchange={infoExchange} />}
          >Exchange Item
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}

export default connect(mapStateToProps)(ExchangeTab);
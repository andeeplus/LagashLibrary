import React, { Component } from 'react';
import Modal from "../../Modal/Modal";
import ExchangeItem from '../ExchangeItem/ExchangeItem'
import SendMessage from '../../messageList/SendMessage/SendMessage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';


class ExchangeZone extends Component {

  state = {
    exchangeItems:[],
    modalShow: false,
    modalShowMsg: false,
    sendEmailTo: '',
    infoExchange:''
  }

  showModal = e => {this.setState({modalShow: true})};
  onClose = e => {this.setState({modalShow: false})};

  showModalMsg = e => {this.setState({modalShowMsg: true})};
  onCloseMsg = e => {this.setState({modalShowMsg: false})};

  componentDidMount(){
    const {detail} = this.props
    
    const recoverData = JSON.parse(localStorage.getItem('lagash-global-exchange'))
    const exchangeItems = recoverData.filter(obj => {
      return obj.idRelease === detail.id.toString()
    })

    
    this.setState({exchangeItems})
  }

  sendMessageToUser(sendEmailTo){
    this.setState({
      sendEmailTo: sendEmailTo.user, 
      infoExchange:{
        id: sendEmailTo.id, 
        artist:sendEmailTo.artist, 
        title: sendEmailTo.title, 
        catno: sendEmailTo.catno}
      }, () => this.showModalMsg() )
  }

  render() {

    
    const {exchangeItems, modalShow, modalShowMsg, sendEmailTo, infoExchange} = this.state
    const {type, detail, user} = this.props

    return (
      

      <div className='interchange-on-page'>

        <h1 className="page-h1">
          <FontAwesomeIcon style={{padding: '0', width: '0.7em', paddingRight: '5px'}} icon="exchange-alt" /> 
          Interchange
            <button 
            className="buttonAddArticle" 
            type="submit"
            onClick={e => {this.showModal()}}
            >
          Exchange Item
          </button>
        </h1>
        
        {exchangeItems.length <= 0 
          ?<p>Item not available yet for exchange</p>
          : 
          <React.Fragment>
          <p>There {exchangeItems.length === 1 ? 'is':'are'} {exchangeItems.length} {exchangeItems.length === 1 ? 'item':'items'} on the exchange area</p>
          <div className="offers-on-page">
          {exchangeItems.map(i =>
            <div key={i.id} className="single-exchange">
            <div className="user-offer-block">
            <img src={i.userImg} alt={i.id + i.userName}/>
            <FontAwesomeIcon onClick={() => this.sendMessageToUser(i)} className="offer-icons" icon="envelope" />
            </div>
            <div className='single-exchange-text'>
            <p className="exchange-title">{i.titleOffer}</p>
            <p className="exchange-desc">{i.offerDetail}</p>
            </div>
           
            </div>
          )}
          </div>
          </React.Fragment>
        }
        <Modal 
        onClose={this.onClose} 
        show={modalShow} 
        trigger={<ExchangeItem user={user} detail={detail} type={type}/>}
        >Exchange Item</Modal>
        <Modal 
        onClose={this.onCloseMsg} 
        show={modalShowMsg} 
        trigger={<SendMessage user={user} sendTo={sendEmailTo} infoExchange={infoExchange} />}
        >Exchange Item</Modal>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}

export default connect(mapStateToProps)(ExchangeZone);

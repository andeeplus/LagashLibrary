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
    infoExchange:'',
  }

  showModal = e => {this.setState({modalShow: true})};
  onClose = e => {this.setState({modalShow: false})};

  showModalMsg = e => {this.setState({modalShowMsg: true})};
  onCloseMsg = e => {this.setState({modalShowMsg: false})};


  async componentDidMount(){
    this.props.exchangeItems && this.filterExchange()
  }

  filterExchange(){
    const {detail,exchangeItems} = this.props
    const filteredEx = exchangeItems.filter(obj => {
    return obj.idRelease === detail.id.toString()
  })

  this.setState({exchangeItems:filteredEx})}

  sendMessageToUser(info){

    this.setState({
      infoExchange:{
        sendEmailTo: info.user,
        receiverPic: info.userImg,
        id: info.id, 
        artist:info.artist, 
        title: info.title, 
        catno: info.catno}
      }, () => this.showModalMsg() )
  }

  render() {

    
    const {exchangeItems, modalShow, modalShowMsg, sendEmailTo, infoExchange} = this.state
    const {type, detail, user} = this.props

    return (
      
      exchangeItems &&
      <div className='interchange-on-page'>

        <h1 className="page-h1">
          <FontAwesomeIcon style={{padding: '0', width: '0.7em', paddingRight: '5px'}} icon="exchange-alt" /> 
          Interchange
            {user && 
            <button 
              className="buttonAddArticle" 
              type="submit"
              onClick={e => {this.showModal()}}
              >
              Exchange Item
            </button>}
        </h1>
        
        { !user 
          ? <p>Signup to exchange your records!</p> 
          : exchangeItems.length <= 0 
          ? <p>Item not available yet for exchange</p>
          : 
          <React.Fragment>
          <p>There {exchangeItems.length === 1 ? 'is':'are'} {exchangeItems.length} {exchangeItems.length === 1 ? 'item':'items'} on the exchange area</p>
          <div className="offers-on-page">
          {exchangeItems.map(i =>
            <div key={i.id} className="single-exchange">
            <div className="user-offer-block">
              <figure>
                <img src={i.userImg} alt={i.id + i.userName}/>
              </figure>
            {user && <FontAwesomeIcon onClick={() => this.sendMessageToUser(i)} className="offer-icons" icon="envelope" />}
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
          trigger={<ExchangeItem user={user} closeModal={this.onClose} detail={detail} type={type}/>}
          >Exchange Item</Modal>
        <Modal 
          onClose={this.onCloseMsg} 
          show={modalShowMsg} 
          trigger={<SendMessage user={user} closeModal={this.onCloseMsg} sendTo={sendEmailTo} infoExchange={infoExchange} />}
          >Exchange Item</Modal>
        </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    exchangeItems: state.exchangeReducer.exchangeItems
  }
}

export default connect(mapStateToProps)(ExchangeZone);

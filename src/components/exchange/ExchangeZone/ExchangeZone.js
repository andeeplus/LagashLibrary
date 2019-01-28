import React, { Component } from 'react';
import Modal from "../../Modal/Modal";
import ExchangeItem from '../ExchangeItem/ExchangeItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';

class ExchangeZone extends Component {

  state = {
    exchangeItems:[],
    showItem:[],
    modalShow: false
  }

  showModal = e => {this.setState({modalShow: true})};
  onClose = e => {this.setState({modalShow: false})};

  componentDidMount(){
    const {detail} = this.props
    
    const recoverData = JSON.parse(localStorage.getItem('lagash-global-exchange'))
    const exchangeItems = recoverData.filter(obj => {
      return obj.idRelease === detail.id.toString()
    })

    console.log(recoverData, exchangeItems, detail.id)
    this.setState({exchangeItems})
  }


  render() {

    
    const {exchangeItems, modalShow} = this.state
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
            <FontAwesomeIcon className="offer-icons" icon="envelope" />
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

import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';
import Loading from '../../../components/Loading/Loading'
import { truncateString } from '../../../services/helper'
import { Link } from 'react-router-dom'

class ExchangeTab extends Component {

  state = {exchangeItems: null, user: null, loading: true}

  componentDidMount(){
    const {exchangeItems} = this.props
    this.setState({exchangeItems, loading: false})
    
  }


  render() {
    const {exchangeItems, loading} = this.state
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
        <img src={i.userImg} alt={i.id + i.userName}/>
        <div className="user-icon-block">
        <FontAwesomeIcon className="offer-icons" icon="envelope" />
        <Link to={`/record/releases/${i.idRelease}`}>
        <FontAwesomeIcon className="offer-icons" icon="link" /></Link>
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
import React, { Component } from 'react';
import Carousel from '../../components/Carousel/Carousel'
import DatabaseApi from '../../services/dbApi'
import ExchangeTab from '../../components/exchange/ExchangeTab/ExchangeTab'
import CommentsTab from '../../components/comments/CommentsTab/CommentsTab'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';
import HotSpot from '../../components/HotSpot/HotSpot'
import Loading from '../../components/Loading/Loading'

class Library extends Component {

  state = {
    fbArticles: null,
    exchangeItems: null,
    hotSpot: null,
    loading: true
  }

  getArticles = async (collectionName) =>{
    const fbArticles =  await DatabaseApi.getCollection(collectionName)
    const hotSpot =  await DatabaseApi.getDocumentById('selections', 'hotNow')
    delete hotSpot.userId
    delete hotSpot.id
  this.setState({fbArticles, hotSpot, exchangeItems: this.props.exchangeItems})
    
  }

  componentDidMount(){
    
    this.getArticles('library')
    window.scrollTo(0, 0)

  }

  render() {

    const {fbArticles, hotSpot} = this.state

    return (
  
      this.state.hotSpot === null ?
      <Loading /> :
      <div className="pages-blocks">
      <h1 className="page-h1">
      <FontAwesomeIcon style={{padding: '0', width: '0.7em', paddingRight: '5px'}} icon="book" /> 
      Lagash Library
      </h1>
      {fbArticles && 
        <Carousel images={fbArticles} 
        size={'header'} 
        dots={{dots:true, dotsType:'square'}}/>}
        <div className='main-page-block'>
          <HotSpot hotSpot={Object.values(hotSpot)} />
        <div className='main-page-right'>
            <ExchangeTab exchangeItems={this.props.exchangeItems}/> 
            <CommentsTab />
          </div>
        </div>

      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    exchangeItems: state.exchangeReducer.exchangeItems
  }
}

export default connect(mapStateToProps)(Library);


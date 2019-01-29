import React, { Component } from 'react';
import Carousel from '../../components/Carousel/Carousel'
import DatabaseApi from '../../services/dbApi'
import ExchangeTab from '../../components/exchange/ExchangeTab/ExchangeTab'
import CommentsTab from '../../components/comments/CommentsTab/CommentsTab'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';
import { setExchange } from '../../redux/actions/exchangeAction';

class Library extends Component {

  state = {
    fbArticles: null,
    exchangeItems: null,
    loading: true
  }

  getArticles = async (collectionName) =>{
    const fbArticles = await DatabaseApi.getCollection(collectionName)
    this.setState({fbArticles, exchangeItems: this.props.exchangeItems})
  }

  componentDidMount(){
    
    this.getArticles('library')
    window.scrollTo(0, 0)

  }

  render() {

    const {fbArticles} = this.state
 
    return (
  
      this.props.exchangeItems &&
      <div className="pages-blocks">
      <h1 className="page-h1">
      <FontAwesomeIcon style={{padding: '0', width: '0.7em', paddingRight: '5px'}} icon="book" /> 
      Lagash Library
      </h1>
      {fbArticles && 
        <Carousel images={fbArticles} 
        size={'header'} 
        dots={{dots:true, dotsType:'square'}}/>}
        <ExchangeTab exchangeItems={this.props.exchangeItems}/> 
        <CommentsTab />
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


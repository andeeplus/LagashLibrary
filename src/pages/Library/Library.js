import React, { Component } from 'react';
import Carousel from '../../components/Carousel/Carousel'
import DatabaseApi from '../../services/dbApi'
import ExchangeTab from '../../components/exchange/ExchangeTab/ExchangeTab'
import CommentsTab from '../../components/comments/CommentsTab/CommentsTab'

class Library extends Component {

  state = {fbArticles: null}

  async getArticles(collectionName, filterName, filterValue){
    const fbArticles = await DatabaseApi.getCollection(collectionName)
    this.setState({fbArticles}, () => console.log(fbArticles))
  }

  componentDidMount(){

    this.getArticles('library')
    window.scrollTo(0, 0)

  }

  render() {

    const {fbArticles} = this.state
 
    return (
  
      <div>
      {fbArticles && 
        <Carousel images={fbArticles} 
        size={'header'} 
        dots={{dots:true, dotsType:'square'}}/>}
        <ExchangeTab />
        <CommentsTab />
      </div>
    );
  }
}

export default Library;
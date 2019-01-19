import React, { Component } from 'react';
import DatabaseApi from '../../../services/dbApi'
import Slider from "react-slick";
import {truncateString} from '../../../services/helper'

export default class Articles extends Component {

  state = {
    pastArticles:[],
    newArticle:[]
  }

  async getArticles(collectionName, filterName, filterValue){
    const pastArticles = await DatabaseApi.getDocument(collectionName, filterName, filterValue)
    console.log('--->ArticlesFirebase',pastArticles)
    this.setState({pastArticles})
  }

  componentDidMount(){
    const {idLabel} = this.props
    console.log(this.props);
    this.getArticles('library', 'idLabel', idLabel.toString())
  }

  render() {

    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
      initialSlide: 0,
      autoplay: true,
      autoplaySpeed: 8000,
      pauseOnHover: true,
      
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    const {pastArticles} = this.state
    return (
      pastArticles !== [] &&
      <div className="articles-carousel">
      <Slider {...settings}>

      {pastArticles.map((i,index) => 
        <div>
          <img src={i.imgArticle} alt={i.index}/>
          <a href={i.link} className="article-mono" key={index}>{truncateString(i.title,30)}</a>
        </div>)}

      </Slider>
      </div>
    );
  }
}







// <div className="articles">
// {pastArticles.map((i,index) => 
//   <img src={i.imgArticle} alt={i.title} />
//   <a href={i.link} className="article-mono" key={index}>{i.title}</a>)}
// </div>
import React, { Component } from 'react';
import DatabaseApi from '../../../services/dbApi'
import Slider from "react-slick";
import ArticleCard from '../ArticleCard/ArticleCard'
import Modal from "../../Modal/Modal";
import AddArticles from '../AddArticles/AddArticles'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Articles extends Component {

  state = {
    fbArticles:[],
    showItem:[],
    modalShow: false
  }

  showModal = e => {this.setState({modalShow: true})};
  onClose = e => {this.setState({modalShow: false})};

  async getArticles(collectionName, filterName, filterValue){
    const fbArticles = await DatabaseApi.getDocument(collectionName, filterName, filterValue)
    console.log('--->ArticlesFirebase',fbArticles)
    this.setState({fbArticles, showItem:fbArticles[0] })
  }

  componentDidMount(){
    //const {idLabel, idArtist, idMaster, idRelease} = this.props
    this.getArticles('library', this.identifyType()[0].toString(), this.identifyType()[1].toString())
  }

  identifyType(){
    const {type, idLabel, idArtist, idMaster, idRelease} = this.props

    switch (type) {
      case 'label':
        return ['idLabel',idLabel]
      case 'master':
        return ['idMaster', idMaster]
      case 'release':
        return ['idRelease', idRelease]
      case 'artist':
        return ['idArtist', idArtist]
      default:
        console.log('Something bad happened')
    }
  }

  render() {

    
    const {fbArticles, modalShow} = this.state
    const {type} = this.props
    const relateArticle = this.identifyType()

    const settings = {
      dots: true,
      lazyLoad: true,
      infinite: true,
      speed: 500,
      slidesToShow: -1,
      slidesToScroll: 1,
      initialSlide: 2,
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
      ]
    };
    return (
      fbArticles !== [] &&

      <React.Fragment>

        <h1 className="page-h1">
          <FontAwesomeIcon icon="book" /> 
          Library
            <button 
            className="buttonAddArticle" 
            type="submit"
            onClick={e => {this.showModal()}}
            >
          Add Article
          </button>
        </h1>
        <div className="caro-box">
          <Slider {...settings} className="articles-carousel">
          {fbArticles.map((i,index) => <ArticleCard property={i}/> )}
          </Slider>
        </div>
        <Modal 
        onClose={this.onClose} 
        show={modalShow} 
        trigger={<AddArticles idType={relateArticle} type={type}/>}
        />
      </React.Fragment>




    );
  }
}



//import AddArticles from '../../library/AddArticles/AddArticles'
//<AddArticles idLabel={results.id} type={'label'} />


// <div className="articles">
// {fbArticles.map((i,index) => 
//   <img src={i.imgArticle} alt={i.title} />
//   <a href={i.link} className="article-mono" key={index}>{i.title}</a>)}
// </div>
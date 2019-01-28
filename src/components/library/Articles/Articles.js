import React, { Component } from 'react';
import DatabaseApi from '../../../services/dbApi'
import Modal from "../../Modal/Modal";
import AddArticles from '../AddArticles/AddArticles'
import MultiCarousel from '../MultiCarousel/MultiCarousel'
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
    this.setState({fbArticles, showItem:fbArticles[0] })
  }

  componentDidMount(){

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

    return (
      

      <React.Fragment>

        <h1 className="page-h1">
          <FontAwesomeIcon style={{padding: '0', width: '0.7em', paddingRight: '5px'}} icon="book" /> 
          Library
            <button 
            className="buttonAddArticle" 
            type="submit"
            onClick={e => {this.showModal()}}
            >
          Add Article
          </button>
        </h1>
        
        {fbArticles.length > 0 
        ?<MultiCarousel images={fbArticles} />
        : <div className="no-articles"><p>Add some articles!</p></div>}
        <Modal 
        onClose={this.onClose} 
        show={modalShow} 
        trigger={<AddArticles idType={relateArticle} type={type}/>}
        >Add an Article</Modal>
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
import React, { Component } from 'react';
import DatabaseApi from '../../../services/dbApi'
import Modal from "../../Modal/Modal";
import AddArticles from '../AddArticles/AddArticles'
import MultiCarousel from '../MultiCarousel/MultiCarousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';

class Articles extends Component {

  state = {
    fbArticles:[],
    showItem:[],
    modalShow: false,
    user: null,
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

  componentDidUpdate(prevProps){
    if (prevProps.user !== this.props.user){this.setState({disabled:false })}
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
    const {type, user} = this.props
    const relateArticle = this.identifyType()

    return (
      

      <React.Fragment>

        <h1 className="page-h1">
          <FontAwesomeIcon style={{padding: '0', width: '0.7em', paddingRight: '5px'}} icon="book" /> 
          Library
           { user && <button 
            className="buttonAddArticle" 
            type="submit"
            onClick={e => {this.showModal()}}
            >
          Add Article
          </button>}
        </h1>
        
        {fbArticles.length > 0 
        ?<MultiCarousel images={fbArticles} />
        : <div className="no-articles"><p>Add some articles!</p></div>}
        <Modal 
          onClose={this.onClose} 
          show={modalShow} 
          trigger={<AddArticles closeModal={this.onClose} idType={relateArticle} type={type}/>}
          >Add an Article
        </Modal>
      </React.Fragment>

    );
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  }
}

export default connect(mapStateToProps)(Articles);
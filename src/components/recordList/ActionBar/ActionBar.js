import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import  DatabaseApi from '../../../services/dbApi'
import { connect } from 'react-redux';
import { refreshUserFromDb } from '../../../redux/actions/refreshUser'
import { refreshFav } from '../../../redux/actions/refreshFav'
import AdminChoice from './AdminChoice/AdminChoice'
import SignUpModule from '../../account/SignUpModule/SignUpModule'
import Modal from '../../Modal/Modal'

class ActionBar extends Component {

  state = {
    user: '',
    labelFav: [],
    artistFav: [],
    releaseFav: [],
    masterFav: [],
    heart: false,
    exchangeId: [],
    exchangeable: false,
    isDisabled: true,
    modalShow: false
  }  


  linkTo(param,id) {
    switch(param) {
      case 'artist':
        return `/detail/artists/${id}`;
      case 'label':
        return `/detail/labels/${id}`;
      case 'master':
        return `/record/masters/${id}`;
      case 'release':
        return `/record/releases/${id}`;
      default:
        return `/record/releases/${id}`
    }
  }


  componentDidMount(){
    
    
    this.firstCall()

  }

  componentDidUpdate(prevProps){
    if (prevProps.favoIds !== this.props.favoIds){this.firstCall()}

  }

  showModal = e => {this.setState({modalShow: true})};
  onClose = e => {this.setState({modalShow: false})};

  firstCall(){
    const {user} = this.props   

    if (user){
      this.setState({
      isDisabled: false,
    },  () => this.shouldPrintHeart(this.props.id.toString())) 
    } else {
      this.setState({isDisabled: true})
    }
  }

  addToGlobalFavs = async (id) => {

    const user = this.props.user

    const {actionProps, favourites, favoIds} = this.props
    const {type} = actionProps

      switch(type){

          case 'label':

          if (favoIds.labelId.includes(id.toString())){      
            this.props.refreshFav(user, 'REMOVE', actionProps, favourites, favoIds)
          } else {
            this.props.refreshFav(user, 'ADD', actionProps, favourites, favoIds)
          } break;
            

        case 'artist':
 
          if (favoIds.artistId.includes(id.toString())){            
            this.props.refreshFav(user, 'REMOVE', actionProps, favourites, favoIds)
          } else {
            this.props.refreshFav(user, 'ADD', actionProps, favourites, favoIds)
          } break;

        case 'release':
  
        if (favoIds.releaseId.includes(id.toString())){         
            this.props.refreshFav(user, 'REMOVE', actionProps, favourites, favoIds)
          } else {
            this.props.refreshFav(user, 'ADD', actionProps, favourites, favoIds)
          } break;

        case 'master':
    
        if (favoIds.masterId.includes(id.toString())){            
            this.props.refreshFav(user, 'REMOVE', actionProps, favourites, favoIds)
          } else {
            this.props.refreshFav(user, 'ADD', actionProps, favourites, favoIds)
          } break;

          default:
      }

      this.shouldPrintHeart(id)
    }
  

  async updateUserFavs (collection, docId, fieldid, itemToAdd){
    await DatabaseApi.updateItemArrayIntoDoc(collection, docId, fieldid, itemToAdd)
    this.props.refreshUserFromDb(this.props.user.id)
  }

  async removeUserFavs(collection, docId, fieldid, itemToRemove){
    await DatabaseApi.removeItemArrayIntoDoc(collection, docId, fieldid, itemToRemove)
    this.props.refreshUserFromDb(this.props.user.id)
  }


  shouldPrintHeart = (id) => {
    const {favoIds} = this.props
 
    switch(this.props.type){
      case 'artist':
      favoIds.artistId.includes(id) ? this.setState({heart: true}) : this.setState({heart: false})
      break;
      case 'label':
      favoIds.labelId.includes(id) ? this.setState({heart: true}) : this.setState({heart: false})
      break;
      case 'release':
      favoIds.releaseId.includes(id) ? this.setState({heart: true}) : this.setState({heart: false})
      break;
      case 'master':
      favoIds.masterId.includes(id) ? this.setState({heart: true}) : this.setState({heart: false})
      break;
      default:

    }

  }

  exchangeAvalaible = (id) => {
    this.props.exchangeId.includes(id) ? this.setState({exchangeable: true}) : this.setState({exchangeable: false})
  }

  render() {
    
    const { id, type, user, actionProps, favoIds } = this.props

    return (

      favoIds &&

      <React.Fragment>
      <div className="list-card-action">
        <Link className="list-card-button" to={this.linkTo(type,id)}>
          <FontAwesomeIcon icon="link" />
        </Link>
        { user ? user.admin && type === 'release' && <AdminChoice actionProps={actionProps} /> : undefined}
        <button 
          className={`list-card-button${this.state.heart ? '-fav' : ''}`} 
          onClick={() => {user ? this.addToGlobalFavs(this.props.id.toString()) : this.showModal()}}>
          <FontAwesomeIcon icon="heart"/></button>
      </div>
      <Modal 
        onClose={this.onClose} 
        show={this.state.modalShow} 
        trigger={<SignUpModule closeModal={this.onClose} />}
        >Register Now
      </Modal>
    </React.Fragment>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    favourites: state.favoReducer.favourites,
    favoIds: state.favoReducer.favoIds,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    refreshUserFromDb: (userid) => { dispatch(refreshUserFromDb(userid)) },
    refreshFav: (user, actionType, actionProps, favourites, favoIds) => { dispatch(refreshFav(user, actionType, actionProps, favourites, favoIds))}
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ActionBar);


// { type === 'release' && <button 
// className={`list-card-button${this.state.exchangeable ? '-interchange' : ''}`/}>
// <FontAwesomeIcon icon="exchange-alt" /></button>}


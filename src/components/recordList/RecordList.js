import React, { Component } from 'react';
import RecordCard from '../recordList/RecordCard/RecordCard'
// import {connect} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withRouter} from 'react-router'
import  DatabaseApi from '../../../src/services/dbApi'
import AuthApi from '../../../src/services/authApi'
import { connect } from 'react-redux';
import { setUserInfo } from '../../redux/actions/authActions'

class RecordList extends Component {

  state = {user: null}

  componentDidMount(){
    AuthApi.registerAuthObserver(async (user) => {
      console.log("​App -> componentDidMount -> user", user)
      let userData = null;
      if (user) {
        userData = await DatabaseApi.getDocumentById('user', user.uid);
        if(!userData){ 
          console.log("Please verify your Firebase setup");
        }
      } 
      this.props.setUser(userData);
      this.setState({user:userData});
    });
  }


  titleId(){

    switch (this.props.match.path) {
      case '/detail/artists/:artist':
        return ['Discography', 'music']
      case '/detail/labels/:label':
        return ['Releases', 'music']
      case '/search-page/:query':
        return ['Results', 'search']
      case '/search':
        return ['Results', 'search']
      default:
        console.log('Something bad happened')
    }
  }

  shouldPrintHeart = (id) => {
    const {labelFav, artistFav, masterFav, releaseFav } = this.state.user

    const labelFavBool = labelFav.includes(id)
    const artistFavBool = artistFav.includes(id)
    const masterFavBool = masterFav.includes(id)
    const releaseFavBool = releaseFav.includes(id)

    return labelFavBool || artistFavBool || masterFavBool || releaseFavBool
  }

  render () {

    const {records, comingFrom} = this.props
    
    return (

      <React.Fragment>
      { comingFrom &&
        <h1 className="page-h1">
        <FontAwesomeIcon icon={this.titleId()[1]} /> 
        {this.titleId()[0]}
        </h1>
      }

       

      <div className='RecordList'>
        {this.state.user && records && records.map(records => {

      

          console.log('RECORDS', records)
            return (
              <div key={records.id} className='RecordList-item'>
                <RecordCard
                  id={records.id}
                  artist={records.artist}
                  title={records.title}
                  label={records.label}
                  style={records.style}
                  genre={records.genre}
                  format={records.format = []}
                  country={records.country}
                  catno={records.catno}
                  heart={this.shouldPrintHeart(records.id)}
                  cover_image={
                    comingFrom === 'pageDetail' 
                    ? records.thumb : records.cover_image}
                  year={records.year}
                  type={records.type}
                  comingFrom={comingFrom}

                />
              </div>
            )
          })
        }
      </div>
      </React.Fragment>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (userInfo) => { dispatch(setUserInfo(userInfo)) }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(RecordList));



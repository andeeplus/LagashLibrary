import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatabaseApi from '../../../../src/services/dbApi'
import { setUserInfo } from '../../../../src/redux/actions/authActions';
import Loading from '../../Loading/Loading'
import AuthApi from '../../../../src/services/authApi'

class Favourites extends Component {

state = {
  user: {},
  labelFav: [],
  releaseFav:[],
  artistFav:[],
  masterFav:[],
  loading: true
}

async getArticles(collectionName, filterName, filterValue){
  const fbArticles = await DatabaseApi.getDocument(collectionName, filterName, filterValue)
  console.log('--->ArticlesFirebase',fbArticles)
  this.setState({fbArticles, showItem:fbArticles[0] })
}

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
    this.setState({
      user:userData,
      labelFav: userData.labelFav ? userData.labelFav : [],
      releaseFav: userData.releaseFav ? userData.releaseFav : [],
      artistFav: userData.artistFav ? userData.artistFav : [],
      masterFav: userData.masterFav ? userData.masterFav : [],
    }, () => this.getFaves());
  });
}

getFaves = async() => {
  let {labelFav, artistFav, releaseFav, masterFav} = this.state
  console.log('------>', labelFav, artistFav, releaseFav, masterFav)

  // const filteredArrays = [labelFav, artistFav, releaseFav, masterFav].filter(element => element.length > 0);

  const getFavLabelPromise = Promise.all(labelFav.map((id) => DatabaseApi.getDocumentById('favourites',id)))
  const getFavArtistPromise = Promise.all(artistFav.map((id) => DatabaseApi.getDocumentById('favourites',id)))
  const getFavReleasePromise = Promise.all(releaseFav.map((id) => DatabaseApi.getDocumentById('favourites',id)))
  const gestMasterFavPromise = Promise.all(masterFav.map((id) => DatabaseApi.getDocumentById('favourites',id)))

  const [getFavLabel, getFavArtist, getFavRelease, gestMasterFav] = await Promise.all([getFavLabelPromise, getFavArtistPromise, getFavReleasePromise, gestMasterFavPromise])


  this.setState({ labelFav: getFavLabel, artistFav: getFavArtist, releaseFav: getFavRelease, masterFav: gestMasterFav, loading: false}, () => console.log('GO!', this.state))
      
}

  render() {

    const {loading} = this.state

    return (
      loading 
      ? <Loading />
      :<div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (userInfo) => { dispatch(setUserInfo(userInfo)) }
  }
}


export default connect(null, mapDispatchToProps)(Favourites);

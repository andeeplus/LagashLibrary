import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatabaseApi from '../../../../src/services/dbApi'
import Loading from '../../Loading/Loading'
import FavouriteList from '../FavouriteList/FavouriteList'
import DropDown from '../DropDown/DropDown'

class Favourites extends Component {

state = {
  user: {},
  labelFav: [],
  releaseFav:[],
  artistFav:[],
  masterFav:[],
  loading: true,

  artistsSelect: true,
  labelsSelect: false,
  recordsSelect:false,
  menuTitle: 'Artists'
}

chooseFavo = (input) => {
  switch(input){
    case 'artists':
    this.setState({artistsSelect : true, labelsSelect: false, recordsSelect:false, menuTitle: 'Artists'})
    break;
    case 'labels':
    this.setState({labelsSelect : true, artistsSelect: false, recordsSelect:false, menuTitle: 'Labels'})
    break;
    case 'records':
    this.setState({recordsSelect:true, labelsSelect: false, artistsSelect:false, menuTitle: 'Records'})
    break;
    default: console.log('Some issue happened')
  }
  
}

async getArticles(collectionName, filterName, filterValue){
  const fbArticles = await DatabaseApi.getDocument(collectionName, filterName, filterValue)
  this.setState({fbArticles, showItem:fbArticles[0] })
}

componentDidMount(){

  const {user} = this.props
  const {labels, artists, releases, masters} = this.props.favourites
  
    this.setState({
      user:user,
      labelFav: labels,
      releaseFav: releases,
      artistFav: artists,
      masterFav: masters,
      loading: false
    });
  
}

  render() {

    const {loading, artistFav, masterFav, labelFav, releaseFav, menuTitle, artistsSelect, labelsSelect, recordsSelect} = this.state
    const fullRecords = {...releaseFav,...masterFav}
  

    return (
      loading 
      ? <Loading />
      :<div>
      <DropDown chooseFavo={this.chooseFavo}>{menuTitle}</DropDown>

      {  Object.entries(artistFav).length === 0  
        ? <p>No favourites yet, search for it!</p>
        :<React.Fragment>
        { artistsSelect && <FavouriteList artistFav={Object.values(artistFav)}/> }
        </React.Fragment>}

      {  Object.entries(labelFav).length === 0  
        ? <p>No favourites yet, search for it!</p>
        :<React.Fragment>
        {labelsSelect && <FavouriteList labelFav={Object.values(labelFav)}/>}
        </React.Fragment>}

      {  Object.entries(releaseFav).length === 0  
        ? <p>No favourites yet, search for it!</p>
        :<React.Fragment>
        {recordsSelect && <FavouriteList recordFav={Object.values(fullRecords)}/>}
      </React.Fragment>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    favourites: state.favoReducer.favourites,
    favoIds: state.favoReducer.favoIds
  }
}

export default connect(mapStateToProps)(Favourites);

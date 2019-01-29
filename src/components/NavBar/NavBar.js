import React, { Component } from 'react';
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import SearchForm from '../SearchForm/SearchForm'

import { connect } from 'react-redux';
import DatabaseApi from '../../../src/services/dbApi'
import AuthApi from '../../../src/services/authApi'
import { setUserInfo } from '../../redux/actions/authActions'
import { setExchange } from '../../redux/actions/exchangeAction';

class NavBar extends Component {

  state = {
    user: {},
    loading: true
  }

  componentDidMount(){
    //this.noUserLoadingBatch()
    this.props.setExchange()
    AuthApi.registerAuthObserver(async (user) => {
     
      let userData = null;
      if (user) {
        userData = await DatabaseApi.getDocumentById('user', user.uid);
        if(!userData){ 
          console.log("Please verify your Firebase setup");
        }
      } 
      this.props.setUser(userData);
      this.setState({user:userData},
        () => {user && this.getUserFavourites()}
        );
    });

    
  }

  // async noUserLoadingBatch(){
  //   const getExchange = await DatabaseApi.getCollection('exchange')
  //   this.props.setExchange(getExchange);
    
  // }

  getUserFavourites = async () => {

    const getFavLabelPromise = DatabaseApi.getDocumentById('labelFav',this.state.user.id)
    const getFavArtistPromise = DatabaseApi.getDocumentById('artistFav',this.state.user.id)
    const getFavReleasePromise = DatabaseApi.getDocumentById('releaseFav',this.state.user.id)
    const getFavMasterPromise = DatabaseApi.getDocumentById('masterFav',this.state.user.id)
    //const getExchangePromise = DatabaseApi.getCollection('exchange')

    let [getFavLabel, getFavArtist, getFavRelease, getFavMaster, /*getExchange*/] = await Promise.all([getFavLabelPromise, getFavArtistPromise, getFavReleasePromise, getFavMasterPromise, /*getExchangePromise*/])
    
    // Here I'm deleting the [id] field - Temp Workaround
    delete getFavLabel.id;
    delete getFavArtist.id;
    delete getFavRelease.id;
    delete getFavMaster.id;

    localStorage.setItem(`${this.state.user.id}_favLabel`, JSON.stringify(getFavLabel));
    localStorage.setItem(`${this.state.user.id}_favArtist`, JSON.stringify(getFavArtist));
    localStorage.setItem(`${this.state.user.id}_favRelease`, JSON.stringify(getFavRelease));
    localStorage.setItem(`${this.state.user.id}_favMaster`, JSON.stringify(getFavMaster));
    //localStorage.setItem('lagash-global-exchange', JSON.stringify(getExchange));
    this.setState({loading: false})
    
  }


  render() {

    const {user} = this.state
    

    return (

      !this.state.loading && 
    <div className="full-nav">
    <div className="logo-ll">
      <NavLink exact to='/'>
      <p>LAGASH LIBRARY</p>
    </NavLink>

    </div>
      <ul className="nav-bar">
        <li className="nav-links">
          <NavLink exact to='/search' 
            activeStyle={activeCss}>
              Search
          </NavLink>
        </li>
        <li className="nav-links">
          <NavLink to='/about' 
            activeStyle={activeCss}>
              About
          </NavLink>
        </li>
        {!user
          ? <li className="nav-links">
          <NavLink to='/login'>
            LogIn
          </NavLink>
          </li>
          : <li className="nav-links">
            <NavLink to={`/user/${user.id}`}>
                Profile
            </NavLink>
          </li>  
        }
      </ul>
      <SearchForm />
    </div>
    );
  }
  
}

const activeCss = {backgroundColor: '#de774e', color: 'white'}


const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (userInfo) => { dispatch(setUserInfo(userInfo)) },
    setExchange: (exchangeItems) => { dispatch(setExchange(exchangeItems))  }
  }
}


export default withRouter(connect(null, mapDispatchToProps)(NavBar));


import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom' 

import NavBar from './components/NavBar/NavBar'
import Footer from '../src/components/footer/Footer'
import LogInModule from '../src/components/account/LogInModule/LogInModule'
import SignUpModule from '../src/components/account/SignUpModule/SignUpModule'

import Home from './pages/Home/Home'
import ArtistPage from './pages/ArtistPage/ArtistPage.js'
import LabelPage from './pages/LabelPage/LabelPage'
import RecordPage from './pages/RecordPage/RecordPage.js'
import SearchPage from './pages/SearchPage/SearchPage.js'
import MessageArea from './pages/MessageArea/MessageArea'
import Library from './pages/Library/Library'
import About from './pages/About/About'
import UserArea from './pages/UserArea/UserArea'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faPlusCircle, faMinusCircle, faHeart, faShareSquare, faLink, faSpinner, faSignInAlt, faSignOutAlt, faBook } from '@fortawesome/free-solid-svg-icons'
library.add(faSearch,faSignInAlt, faBook, faSignOutAlt, faSpinner, faPlusCircle, faMinusCircle, faHeart, faShareSquare, faLink)


export default () => (
  <BrowserRouter>
    <div>
      <NavBar />
      <Switch>
        <Route exact path='/home' component={Home} />
        <Route exact path='/search' component={SearchPage} />
        <Route exact path='/search-page/:query' component={SearchPage} />
        <Route exact path='/detail/artists/:artist' component={ArtistPage} />
        <Route exact path='/detail/labels/:label' component={LabelPage} />
        <Route exact path='/record/masters/:record' component={RecordPage} />
        <Route exact path='/record/releases/:record' component={RecordPage} />
        <Route exact path='/library' component={Library} />
        <Route exact path='/messages' component={MessageArea} />
        <Route exact path='/user/:user' component={UserArea} />
        <Route exact path='/login' component={LogInModule} />
        <Route exact path='/signup' component={SignUpModule} />
        <Route exact path='/about' component={About} />
        <Redirect from="/" to="/home" />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
)
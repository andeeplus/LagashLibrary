import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom' 

import NavBar from './components/NavBar/NavBar'
import Footer from '../src/components/footer/Footer'
import LogInModule from '../src/components/account/LogInModule/LogInModule'
import SignUpModule from '../src/components/account/SignUpModule/SignUpModule'
import PersonalDetail from './components/userZone/PersonalDetail/PersonalDetail'

import RecordPage from './pages/RecordPage/RecordPage.js'
import SearchPage from './pages/SearchPage/SearchPage.js'
import MessageArea from './pages/MessageArea/MessageArea'
import Library from './pages/Library/Library'
import About from './pages/About/About'
import UserArea from './pages/UserArea/UserArea'
import LabelPage from './pages/LabelPage/LabelPage'
import ArtistPage from './pages/ArtistPage/ArtistPage'
import Favourites from './components/userZone/Favourites/Favourites'

import PrivateRoute from './specialRoutes/PrivateRoute'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faMusic, faSquare, faWindowClose, faExchangeAlt, faPlusCircle, faVideo, faMinusCircle, faHeart, faShareSquare, faLink, faSpinner, faSignInAlt, faSignOutAlt, faBook, faComment, faCodeBranch, faArrowRight, faArrowLeft, faUser, faEnvelope, faCaretDown, faCircle, faExternalLinkAlt, faHandshake, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
library.add(faSearch, faExternalLinkAlt, faWindowClose, faHandshake, faExchangeAlt, faCaretDown, faSquare, faCircle, faVideo, faUser, faEnvelope, faArrowRight, faArrowLeft, faComment, faCodeBranch, faSignInAlt, faMusic, faBook, faSignOutAlt, faSpinner, faPlusCircle, faMinusCircle, faHeart, faShareSquare, faLink, faPaperPlane)


export default () => (
  <BrowserRouter>
    <div>
      <NavBar />
      <Switch>
        <Route exact path='/home' component={Library} />
        <Route exact path='/search' component={SearchPage} />
        <Route exact path='/search-page/:query' component={SearchPage} />
        <Route exact path='/detail/artists/:artist' component={ArtistPage} />
        <Route exact path='/detail/labels/:label' component={LabelPage} />
        <Route exact path='/record/masters/:record' component={RecordPage} />
        <Route exact path='/record/releases/:record' component={RecordPage} />
        <Route exact path='/login' component={LogInModule} />
        <Route exact path='/signup' component={SignUpModule} />
        <Route exact path='/about' component={About} />
        <PrivateRoute exact path='/user/:user' componentUser={UserArea} />
        <PrivateRoute exact path='/user/:user/messages' componentUser={MessageArea} />
        <PrivateRoute exact path='/user/:user/your-library' componentUser={Favourites} />
        <PrivateRoute exact path='/user/:user/your-favourites' componentUser={Favourites} />
        <PrivateRoute exact path='/user/:user/personal-detail' componentUser={PersonalDetail} />
        <Redirect from="/" to="/home" />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
)
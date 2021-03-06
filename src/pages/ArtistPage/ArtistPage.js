import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import ArtistDetail from '../../components/recordDetails/ArtistDetail/ArtistDetail'
import Loading from '../../components/Loading/Loading'
import {DiscogsApi} from '../../services/DiscogsApi'

class ArtistPage extends Component {

  state = {
    loading: true,
    results: [],
    releases: []
  }

  async fetchData(query){

    const results = await DiscogsApi.getQuery(`https://api.discogs.com/artists/${query}`)
    const releases = await DiscogsApi.getQuery(`https://api.discogs.com/artists/${query}/releases`)
    
    Promise.all([results,releases],this.setState({results, releases, loading:false}))

  }

  callQuery(){
    const {artist} = this.props.match.params
    this.fetchData(artist)
  }

  componentDidMount() {
    this.callQuery()
  }

  componentDidUpdate(prevProps){
    if (prevProps.match.params !== this.props.match.params){
      this.callQuery()
    }
  }

  render() {

    const {results, releases, loading} = this.state
    return (

      loading 
      ? <Loading />
      : <div className='pages-blocks'>
        <ArtistDetail results={results} releases={releases} />
        </div>
    );
  }
}

export default ArtistPage;
import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import LabelDetail from '../../components/recordDetails/LabelDetail/LabelDetail'
import Loading from '../../components/Loading/Loading'
import {DiscogsApi} from '../../services/DiscogsApi'

class LabelPage extends Component {

  state = {
    loading: true,
    results: [],
    releases: []
  }

  async fetchData(query){

    const results = await DiscogsApi.getQuery(`https://api.discogs.com/labels/${query}`)
    const releases = await DiscogsApi.getQuery(`https://api.discogs.com/labels/${query}/releases`)
    console.log('--->URL--->',`https://api.discogs.com/labels/${query}`,`https://api.discogs.com/labels/${query}/releases`)
    Promise.all([results,releases],this.setState({results, releases, loading:false}))

    console.log('---->STATE: ',this.state)
  }

  componentDidMount() {
    const {label} = this.props.match.params
    this.fetchData(label)
  }

  render() {

    const {results, releases, loading} = this.state
    return (

      loading 
      ? <Loading />
      : <div className='pages-blocks'>
        <LabelDetail results={results} releases={releases} />
      </div>
    );
  }
}

export default LabelPage;
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import MasterDetail from '../../components/recordDetails/MasterDetail/MasterDetail'
import ReleaseDetail from '../../components/recordDetails/ReleaseDetail/ReleaseDetail'
import Loading from '../../components/Loading/Loading'
import {DiscogsApi} from '../../services/DiscogsApi'


class RecordPage extends Component {

  state = {
    loading: true,
    results: [],
    versions: []
  }

  static propTypes = {
    id: PropTypes.number,
    artist: PropTypes.array,
    year: PropTypes.string,
    genres: PropTypes.array,
    styles: PropTypes.array,
    tracklist: PropTypes.array,
    title: PropTypes.string
  }

  async fetchData(query){

    const pageUrl = this.props.location.pathname.split('/')[2]

    const results = await DiscogsApi.getQuery(`https://api.discogs.com/${pageUrl}/${query}`)
    const versions = await DiscogsApi.getQuery(`https://api.discogs.com/masters/${query}/versions`)
    Promise.all([results,versions],this.setState({results, versions, loading:false}))

 
  }

  componentDidMount() {
    const {record} = this.props.match.params
    this.fetchData(record)
  }

  recCompo(results, versions){
   let url = this.props.location.pathname.split('/')[2]
   switch (url){
     case 'masters':
      return <MasterDetail detail={results} versions={versions} />
    case 'releases':
      return <ReleaseDetail detail={results} versions={versions}/>
     default:
   }
  }


  render() {

    const {results, versions, loading} = this.state

    return (
      
          loading 
          ? <Loading />
          : <div className='pages-blocks'>
            {this.recCompo(results, versions)}
          </div>
    );
  }
}

export default RecordPage;

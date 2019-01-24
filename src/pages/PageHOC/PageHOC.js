import React, { Component } from 'react';
import PropTypes from 'prop-types'
import MasterDetail from '../../components/recordDetails/MasterDetail/MasterDetail'
import ReleaseDetail from '../../components/recordDetails/ReleaseDetail/ReleaseDetail'
import Loading from '../../components/Loading/Loading'
import {DiscogsApi} from '../../services/DiscogsApi'
import ArtistDetail from '../../components/recordDetails/ArtistDetail/ArtistDetail'
import LabelDetail from '../../components/recordDetails/LabelDetail/LabelDetail'

class RecordPage extends Component {

  state = {
    loading: true,
    results: [],
    moreDetails: [],
    componentToRender: ''
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

  async fetchData(query, location, extraDetail){
    
    const results = await DiscogsApi.getQuery(`https://api.discogs.com/${location}/${query}`)
    const moreDetails = await DiscogsApi.getQuery(`https://api.discogs.com/${location}/${query}/${extraDetail}`)
    Promise.all([results,moreDetails],this.setState({results, moreDetails, loading:false}))
  }

  componentDidMount() {
    this.setState({loading:})
  }

  fetchChoice(){
  
    let urlLocation = this.props.location.pathname.split('/')[2]
    const {record} = this.props.match.params
    const {label} = this.props.match.params
    const {artist} = this.props.match.params

    switch (urlLocation){
      case 'labels':
        this.fetchData(label, urlLocation, 'releases')
        break;
      case 'artists':
        this.fetchData(artist, urlLocation, 'releases')
        break;
      default:
        this.fetchData(record, urlLocation, 'versions')
        break;
   }
  }

  recCompo(results, moreDetails){
    let url = this.props.location.pathname.split('/')[2]

    switch (url){
      case 'masters':
        return <MasterDetail detail={results} versions={moreDetails} />
      case 'releases':
        return <ReleaseDetail detail={results} versions={moreDetails}/>
      case 'artists':
        return <ArtistDetail results={results} releases={moreDetails} />
      case 'labels':
        return <LabelDetail results={results} releases={moreDetails} />
      default:
       console.log('none of two')
    }
   }
 
  render() {

    const {results, moreDetails, loading} = this.state
    console.log('--->',results)
    console.log('RECORD PAGE',results,moreDetails)
    return (
      
          loading 
          ? <Loading />
          : <div className='pages-blocks'>
            {this.recCompo(results, moreDetails)}
          </div>
    );
  }
}

export default RecordPage;



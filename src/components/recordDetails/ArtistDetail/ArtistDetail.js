import React, { Component } from 'react';
import RecordList from '../../../components/recordList/RecordList'
import { NavLink } from 'react-router-dom'
import Articles from '../../library/Articles/Articles'
import Comments from '../../comments/Comments'
import Carousel from '../../Carousel/Carousel'
import VideoPlayer from '../../VideoPlayer/VideoPlayer'
import Loading from '../../Loading/Loading'

class ArtistDetail extends Component {

  state = {
    results: null,
    releases: null
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    const {results, releases} = this.props
    this.setState({results, releases})
  }
  
  render() {

    const {results, releases} = this.state

    return (
      !results ? <Loading /> : 
      <React.Fragment>
        <div className="page-block">
        <Carousel images={results.images} size={'small-square'}/>
          <div className="page-details">
            <p className="page-name">{results.name}</p>
            { results.realname && <p className="page-real-name">{results.realname}</p>}
            { results.aliases &&   
            <React.Fragment>
            <p className="page-desc"><strong>Aliases: </strong></p>
            <p>{results.aliases.map((i,index) => 
              <NavLink 
              key={index} 
              className="single-aliases" 
              to={`${i.resource_url.replace('https://api.discogs.com/artists/','')}`}>
              {i.name}
              </NavLink>)}
              </p>
            </React.Fragment>}
            {results.profile && 
            <React.Fragment>
              <p className="page-desc"><strong>Info: </strong></p>
              <p className="page-desc" dangerouslySetInnerHTML={{__html:results.profile_html}} ></p>
            </React.Fragment>}
            {results.contact_info && <p className="page-contact"><strong>Contact: </strong>{results.contact_info}</p>}
            
              {results.urls && 
                <React.Fragment>
                <p className="web-page"><strong>Sites:</strong></p>
              {results.urls.map((i,index) => <a 
                key={index} 
                className="web-page" 
                href={i}>{
                  i.replace('http://www.','')
                  .replace('www','')
                  .replace('http://','')
                  .replace('https://','')
                }
                  </a>)}
                </React.Fragment>}
          </div>
        </div>

        <Articles idArtist={results.id} type={'artist'} />
        {results.videos && <VideoPlayer videos={results.videos} />}
        <Comments idArtist={results.id} type={'artist'} onPage={results.name} />
        {releases && <RecordList records={releases.releases} cardType={'small'}/>}
      </React.Fragment>

    );
  }
}

export default ArtistDetail;
import React, { Component } from 'react';
import RecordList from '../../../components/recordList/RecordList'
import { NavLink } from 'react-router-dom'
import Articles from '../../library/Articles/Articles'
import Comments from '../../comments/Comments'
import Carousel from '../../Carousel/Carousel'

class ArtistDetail extends Component {
  render() {

    const {results, releases} = this.props
    console.log('---->result.id', results.id)

    return (

      <React.Fragment>
        <div className="page-block">
        <Carousel images={results.images} />
          <div className="page-details">
            <p className="page-name">{results.name}</p>
            { results.realname && <p className="page-real-name">{results.realname}</p>}
            { results.aliases &&            
            <p className="page-aliases"><strong>Aliases: </strong>
            {results.aliases.map((i,index) => <NavLink 
              key={index} 
              className="web-page" 
              to={`detail/artists/${i.resource_url.replace('https://api.discogs.com/artists/','')}`}>
              {i.name}
              </NavLink>)}
            </p>}
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
                  .replace('http://','')}</a>)}
                </React.Fragment>}
          </div>
        </div>

        <Articles idArtist={results.id} type={'artist'} />
        <Comments idArtist={results.id} type={'artist'} />
        <RecordList records={releases.releases} comingFrom={'pageDetail'}/>
      </React.Fragment>

    );
  }
}

export default ArtistDetail;
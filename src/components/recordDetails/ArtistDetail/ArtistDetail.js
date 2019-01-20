import React, { Component } from 'react';
import vinyl from '../../../img/vinyl.svg'
import RecordList from '../../../components/recordList/RecordList'
import { NavLink } from 'react-router-dom'
import Articles from '../../library/Articles/Articles'

class ArtistDetail extends Component {
  render() {

    const {results, releases} = this.props

    return (

      <React.Fragment>
        <div className="page-block">
          <figure>
          <img className="main-rec-image" 
          src={
            results.images
            ? results.images[0].uri
            : vinyl
          } alt='record' />
        </figure>
          <div className="page-details">
            <p className="page-name">{results.name}</p>
            <p className="page-real-name">{results.realname}</p>
            <p className="page-aliases"><strong>Aliases: </strong>
            {results.aliases.map((i,index) => <NavLink 
              key={index} 
              className="web-page" 
              to={`detail/artists/${i.resource_url.replace('https://api.discogs.com/artists/','')}`}>
              {i.name}
              </NavLink>)}
            </p>
            <p className="page-desc"><strong>Info: </strong><p dangerouslySetInnerHTML={{__html:results.profile_html}} ></p></p>
            {results.contact_info && <p className="page-contact"><strong>Contact: </strong>{results.contact_info}</p>}
            <p className="web-page"><strong>Sites:</strong></p>
            {results.urls.map((i,index) => <a 
              key={index} 
              className="web-page" 
              href={i}>{
                i.replace('http://www.','')
                .replace('http://','')}</a>)}
            
          </div>
        </div>

        <Articles idArtist={results.id} type={'artist'} />
        <RecordList records={releases.releases} comingFrom={'labelDetail'}/>
      </React.Fragment>

    );
  }
}

export default ArtistDetail;
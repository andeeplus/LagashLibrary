import React, { Component } from 'react';
import vinyl from '../../../img/vinyl.svg'
import ReleasesTable from '../ReleasesTable/ReleasesTable'
import { NavLink } from 'react-router-dom'
import Articles from '../../library/Articles/Articles'
import AddArticles from '../../library/AddArticles/AddArticles'

class LabelDetail extends Component {
  render() {

    const {results, releases} = this.props

    return (
      <React.Fragment>
        <div className="label-block">
          <figure>
          <img className="main-rec-image" 
          src={
            results.images
            ? results.images[0].uri
            : vinyl
          } alt='record' />
        </figure>
          <div className="record-details">
            <p className="label-name">{results.name}</p>
            <p className="label-description"><span>Info: </span>{results.profile}</p>
            <p className="label-contact"><span>Contact: </span>{results.contact_info}</p>
            <p className="web-label"><span>Sites:</span></p>
            {results.urls.map((i,index) => <a 
              key={index} 
              className="web-label" 
              href={i}>{
                i.replace('http://www.','')
                 .replace('http://','')}</a>)}
            
          </div>
        </div>
        <AddArticles idLabel={results.id} type={'label'} />
        <Articles idLabel={results.id} type={'label'} />
        <ReleasesTable releases={releases}/>
      </React.Fragment>
    );
  }
}

export default LabelDetail;


// contact_info: "info [at] pitchdownrecords [dot] com"
// data_quality: "Needs Vote"
// id: 856874
// images: (2) [{…}, {…}]
// name: "Pitch Down records"
// profile: "Established & Operated by [a=LC12] Based in Spain."
// releases_url: "https://api.discogs.com/labels/856874/releases"
// resource_url: "https://api.discogs.com/labels/856874"
// uri: "https://www.discogs.com/label/856874-Pitch-Down-records"
// urls: ["http://www.pitchdownrecords.com/"]
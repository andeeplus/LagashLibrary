import React, { Component } from 'react';
import vinyl from '../../../img/vinyl.svg'
import Articles from '../../library/Articles/Articles'
import RecordList from '../../../components/recordList/RecordList'

class LabelDetail extends Component {
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
            <p className="page-desc"><strong>Info: </strong><p dangerouslySetInnerHTML={{__html:results.profile_html}} ></p></p>
            <p className="label-contact"><strong>Contact: </strong>{results.contact_info}</p>
            <p className="web-page"><strong>Sites:</strong></p>
            {results.urls.map((i,index) => <a 
              key={index} 
              className="web-page" 
              href={i}>{
                i.replace('http://www.','')
                 .replace('http://','')}</a>)}
            
          </div>
        </div>

        <Articles idLabel={results.id} type={'label'} />
        <RecordList records={releases.releases} comingFrom={'labelDetail'}/>
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
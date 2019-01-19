import React, { Component } from 'react';
import vinyl from '../../../img/vinyl.svg'
import VersionList from '../VersionList/VersionList'

export default class MasterDetail extends Component {

  
  render() {

    const {detail, versions} = this.props
    console.log('Master Detail ------>',detail, this.props)
  
      return (
        
        detail &&
        
        <React.Fragment>
          <div className="block-rec">
            <figure>
              <img className="main-rec-image" 
              src={
                detail.images
                ? detail.images[0].uri
                : vinyl
              } alt='record' />
            </figure>
            <div className="record-details">
              <p className="record-det-artist">{detail.artists[0].name}</p>
              <p className="record-det-title">{detail.title}</p>
            <div className="genre-block">
              {detail.genres.map( i => <p key={i} className="main-genre">{i}</p>)}
              {detail.styles && detail.styles.map( i => <p key={i} className="main-style">{i}</p>)}
            </div>
            <div className="tracklist-record">
              {detail.tracklist.map((a, index) => 
              <p key= {index} className="track-rec">
              {a.position && <span className="label-track">{a.position}</span> }
              {a.type_ === 'heading' ? <span className="heading-rec">{a.title}</span>
              : a.title}
              <i>{a.duration}</i>
              </p>)}
            </div>
          </div>
         </div>
         <VersionList versions={versions}/>
        </React.Fragment>
        
    );
  }
}

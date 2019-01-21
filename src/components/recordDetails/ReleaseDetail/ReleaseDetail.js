import React, { Component } from 'react';
import vinyl from '../../../img/vinyl.svg'
import VersionList from '../VersionList/VersionList'


export default class ReleaseDetail extends Component {

  
  render() {

    const {detail, versions} = this.props
    console.log('Release Detail ------>',detail,versions, this.props)
  
      return (
        <React.Fragment>
          <div className="page-block">
          <figure>
            <img className="main-rec-image" 
            src={
              detail.images
              ? detail.images[0].uri
              : vinyl
            } alt='record' />
          </figure>
          <div className="page-details">
            <p className="record-det-artist">{detail.artists_sort}</p>
            <p className="record-det-title">{detail.title}</p>
          <div className="genre-block">
            {detail.genres.map( (i, index) => <p key={index} className="main-genre">{i}</p>)}
            {detail.styles && detail.styles.map( (i, index)  => <p key={index} className="main-style">{i}</p>)}
          </div>
          
          {detail.labels.map((i,index) => <p key={index} className="rec-label"><span>{i.name}</span>{i.catno}</p>)}

          <div className="format-year">
            <div className="year">{detail.year}</div>
            <div className="format-rec">{detail.formats.map(i => i.name)}</div>
            <div className="country-rec">{detail.country}</div>
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
          { versions && versions.versions.length !== 0 &&
            <VersionList versions={versions}/>}
        </React.Fragment>

    );
  }
}

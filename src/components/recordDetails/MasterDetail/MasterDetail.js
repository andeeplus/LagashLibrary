import React, { Component } from 'react';
import VersionList from '../VersionList/VersionList'
import Comments from '../../comments/Comments'
import Articles from '../../library/Articles/Articles'
import Carousel from '../../Carousel/Carousel'
import VideoPlayer from '../../VideoPlayer/VideoPlayer'

export default class MasterDetail extends Component {
  
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  
  render() {

    const {results, versions} = this.props
  
      return (
        
        results &&
        
        <React.Fragment>
          <div className="page-block">
          <Carousel images={results.images} size={'small-square'}/>
            <div className="page-resultss">
              <p className="record-det-artist">{results.artists[0].name}</p>
              <p className="record-det-title">{results.title}</p>
            <div className="genre-block">
              {results.genres.map( i => <p key={i} className="main-genre">{i}</p>)}
              {results.styles && results.styles.map( i => <p key={i} className="main-style">{i}</p>)}
            </div>
            <div className="tracklist-record">
              {results.tracklist.map((a, index) => 
              <p key= {index} className="track-rec">
              {a.position && <span className="label-track">{a.position}</span> }
              {a.type_ === 'heading' ? <span className="heading-rec">{a.title}</span>
              : a.title}
              <i>{a.duration}</i>
              </p>)}
            </div>
          </div>
         </div>
         <Articles idMaster={results.id} type={'master'} />
         {results.videos && <VideoPlayer videos={results.videos} />}
         <Comments idMaster={results.id} type={'master'} onPage={results.artists[0].name}/>
         {versions && versions.versions.length !== 0 && <VersionList versions={versions}/>}
        </React.Fragment>
        
    );
  }
}

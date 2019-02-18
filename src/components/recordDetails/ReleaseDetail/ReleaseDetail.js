import React, { Component, lazy, Suspense } from 'react';
import VersionList from '../VersionList/VersionList'
import Comments from '../../comments/Comments'
import Articles from '../../library/Articles/Articles'
import Carousel from '../../Carousel/Carousel'
import VideoPlayer from '../../VideoPlayer/VideoPlayer'
import Loading from '../../Loading/Loading'
const ExchangeZone = lazy(() => import('../../exchange/ExchangeZone/ExchangeZone'))

export default class ReleaseDetail extends Component {
  
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  
  render() {

    const {results, versions} = this.props

      return (
        <React.Fragment>
          <div className="page-block">
            <Carousel images={results.images} size={'small-square'}/>
              <div className="page-resultss">
                <p className="record-det-artist">{results.artists_sort}</p>
                <p className="record-det-title">{results.title}</p>
              <div className="genre-block">
                {results.genres.map( (i, index) => <p key={index} className="main-genre">{i}</p>)}
                {results.styles && results.styles.map( (i, index)  => <p key={index} className="main-style">{i}</p>)}
              </div>
              
              {results.labels.map((i,index) => <p key={index} className="rec-label"><span>{i.name}</span>{i.catno}</p>)}

              <div className="format-year">
                <div className="year">{results.year}</div>
                <div className="format-rec">{results.formats.map(i => i.name)}</div>
                <div className="country-rec">{results.country}</div>
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
          <Suspense fallback={<Loading />}>
            <ExchangeZone results={results} type={'release'}/>
          </Suspense>
          <Articles idRelease={results.id} type={'release'} />
          {results.videos && <VideoPlayer videos={results.videos} />}
          <Comments idRelease={results.id} type={'release'} onPage={results.artists[0].name}/>
          { versions && versions.versions.length !== 0 && <VersionList results={results} versions={versions}/>}
        </React.Fragment>

    );
  }
}


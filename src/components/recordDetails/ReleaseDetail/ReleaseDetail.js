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

    const {detail, versions} = this.props

      return (
        <React.Fragment>
          <div className="page-block">
          <Carousel images={detail.images} size={'small-square'}/>
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
          <Suspense fallback={<Loading />}>
          <ExchangeZone detail={detail} type={'release'}/>
          </Suspense>
          <Articles idRelease={detail.id} type={'release'} />
          {detail.videos && <VideoPlayer videos={detail.videos} />}
          <Comments idRelease={detail.id} type={'release'} onPage={detail.artists[0].name}/>
          { versions && versions.versions.length !== 0 &&
            <VersionList detail={detail} versions={versions}/>}
        </React.Fragment>

    );
  }
}


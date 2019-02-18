import React, { Component } from 'react';
import Articles from '../../library/Articles/Articles'
import RecordList from '../../../components/recordList/RecordList'
import Comments from '../../comments/Comments'
import Carousel from '../../Carousel/Carousel'
import VideoPlayer from '../../VideoPlayer/VideoPlayer'

class LabelDetail extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {

    const {results, releases} = this.props

    return (
      <React.Fragment>
        <div className="page-block">
        <Carousel images={results.images} size={'small-square'}/>
          <div className="page-details">
            <p className="page-name">{results.name}</p>
            <p className="page-desc"><strong>Info: </strong></p>
            <p className="page-desc" dangerouslySetInnerHTML={{__html:results.profile_html}} ></p>
            <p className="label-contact"><strong>Contact: </strong></p>
            <p className="label-contact">{results.contact_info}</p>
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
        {results.videos && <VideoPlayer videos={results.videos} />}
        <Comments idLabel={results.id} type={'label'} onPage={results.name}/>
        <RecordList records={releases.releases} cardType={'small'}/>
      </React.Fragment>
    );
  }
}

export default LabelDetail;


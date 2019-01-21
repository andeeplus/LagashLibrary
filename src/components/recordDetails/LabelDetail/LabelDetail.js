import React, { Component } from 'react';
import vinyl from '../../../img/vinyl.svg'
import Articles from '../../library/Articles/Articles'
import RecordList from '../../../components/recordList/RecordList'
import Comments from '../../comments/Comments'

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
        <Comments idLabel={results.id} type={'label'} />
        <RecordList records={releases.releases} comingFrom={'pageDetail'}/>
      </React.Fragment>
    );
  }
}

export default LabelDetail;


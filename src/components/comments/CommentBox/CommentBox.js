import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class CommentBox extends Component {
  identifyType(type,idLabel, idArtist, idMaster, idRelease){

    switch (type) {
      case 'label':
        return `/detail/labels/${idLabel}`
      case 'master':
        return `/record/masters/${idMaster}`
      case 'release':
        return `/record/releases/${idRelease}`
      case 'artist':
        return `/detail/artists/${idArtist}`
      default:
        console.log('Something bad happened')
    }

  }

  render() {
    const {comments,styler} = this.props

    return (
      <div className="comment-box">
        {comments.map((i,index) =>
          <div key={index} className="single-comment">
          {styler==='no-page' && <p className="comments-on-page"><span>@ </span>
          <Link to={`${this.identifyType(i.type, i.idLabel, i.idArtist, i.idMaster, i.idRelease)}`}>
          {i.onPage}</Link></p>}
          <p className="comment-line" key={index}><strong>{i.userName}: </strong>{i.comment}</p>
          <p className="comment-timestamp"><strong>{i.date.split(' ')[0]} </strong>{i.date.split(' ')[1]}</p>
          </div>
        )}
      </div>
    );
  }
}

export default CommentBox;
import React, { Component } from 'react';


class CommentBox extends Component {
  render() {
    const {comments} = this.props
    return (
      <div className="comment-box">
        {comments.map((i,index) => <p key={index}><strong>{i.userName}: </strong>{i.comment}</p>)}
      </div>
    );
  }
}

export default CommentBox;
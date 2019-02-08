import React, { Component } from 'react';
import DatabaseApi from '../../../services/dbApi'
import CommentBox from '../CommentBox/CommentBox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class CommentsTab extends Component {

  state = {
    fbComments:[],
  }

  componentDidMount(){

    DatabaseApi.getDocumentDateNow24('comments', Date.now(),
      (fbComments) => {
      this.setState({fbComments})})
      
  }


  render() {

    const {fbComments} = this.state
    const filteredComments = fbComments.slice(Math.max(fbComments.length - 5, 1)).reverse()

    return (

      fbComments &&
      <React.Fragment>
        <h1 className="page-h1">
        <FontAwesomeIcon icon="comment" /> 
        Latest Comments
        </h1>
        {fbComments && <CommentBox comments={filteredComments} styler={'no-page'} onPage={this.props.onPage}/>}
      </React.Fragment>
    );
  }
}

export default CommentsTab;
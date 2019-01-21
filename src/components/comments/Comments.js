import React, { Component } from 'react';
import DatabaseApi from '../../services/dbApi'
import AddComment from './AddComment/AddComment'
import CommentBox from './CommentBox/CommentBox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Comments extends Component {

  state = {
    fbComments:[],
  }

  async getArticles(collectionName, filterName, filterValue){
    const fbComments = await DatabaseApi.getDocument(collectionName, filterName, filterValue)
    console.log('--->ArticlesFirebase',fbComments)
    this.setState({fbComments})
  }

  componentDidMount(){

    this.getArticles('comments', this.identifyType()[0].toString(), this.identifyType()[1].toString())
    
  }

  identifyType(){
    const {type, idLabel, idArtist, idMaster, idRelease} = this.props

    switch (type) {
      case 'label':
        return ['idLabel',idLabel]
      case 'master':
        return ['idMaster', idMaster]
      case 'release':
        return ['idRelease', idRelease]
      case 'artist':
        return ['idArtist', idArtist]
      default:
        console.log('Something bad happened')
    }
  }

  render() {

    const {type} = this.props
    const {fbComments} = this.state
    return (
      <React.Fragment>
        <h1 className="page-h1">
        <FontAwesomeIcon icon="comment" /> 
        Comments
        </h1>
        {fbComments && <CommentBox comments={fbComments}/>}
        <AddComment 
        id={this.identifyType()} 
        type={type}/>
      </React.Fragment>
    );
  }
}

export default Comments;

   
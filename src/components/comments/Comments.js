import React, { Component } from 'react';
import DatabaseApi from '../../services/dbApi'
import AddComment from './AddComment/AddComment'
import CommentBox from './CommentBox/CommentBox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
class Comments extends Component {

  state = {
    fbComments:[],
  }


  componentDidMount(){

    DatabaseApi.getRealtimeDocument('comments', this.identifyType()[0].toString(), this.identifyType()[1].toString(),
      (fbComments) => {
      this.setState({fbComments});})
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

    const {type, onPage} = this.props
    const {fbComments} = this.state
    return (
      <React.Fragment>
        <h1 className="page-h1">
        <FontAwesomeIcon icon="comment" /> 
        Comments
        </h1>
        {fbComments && <CommentBox comments={fbComments}/>}
        {this.props.user && <AddComment 
        id={this.identifyType()} 
        type={type}
        onPage={onPage}
        />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}


export default connect(mapStateToProps)(Comments);


   
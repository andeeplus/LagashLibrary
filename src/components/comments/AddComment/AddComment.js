import React, { Component } from 'react';
import DatabaseApi from '../../../services/dbApi'
import { connect } from 'react-redux';


class AddComment extends Component {
  state = {
    comment: '',
    userName: '',
    idLabel: '',
    idArtist: '',
    idMaster: '',
    idRelease: '',
    imgArticle: '',
    type: '',
    userId: '',
    user:{},
    loading: true
  }

  addDocs = (comment) => DatabaseApi.addDocument('comments',comment)


  // componentDidMount(){

  //   const {user} = this.props
  //   console.log('user on add comment', user)
  //     this.setState({
  //       user:user, 
  //       userName: user.userName, 
  //       userId: user.id,
  //       loading: false
  //     });

  // }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const{ 
      idLabel = this.props.id[0] === 'idLabel' ? this.props.id[1].toString() : '',
      idArtist = this.props.id[0] === 'idArtist' ? this.props.id[1].toString()  : '',
      idMaster = this.props.id[0] === 'idMaster' ? this.props.id[1].toString()  : '',
      idRelease = this.props.id[0] === 'idRelease' ? this.props.id[1].toString()  : '',
      type= ''} = this.props

    
    const commentUp = {
      comment: this.state.comment,
      userName: this.props.user.userName,
      userId: this.props.user.userId,
      idLabel,
      idArtist,
      idMaster,
      idRelease,
      type
    }

    this.addDocs(commentUp)
    this.refs.comment.value = ''
    
  }


  render() {
    return (

      !this.state.loading &&
      <form className="send-comment-box" onSubmit={this.handleSubmit}>
        <div className="addComment">
            <textarea id="comment" ref="comment"
            onChange={this.handleChange} 
            placeholder="Write your comment here..." 
            required />
        <div className="comment-controls">
          <button className="buttonSend" type="submit">Send</button>
        </div>
        </div>
      </form>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}

export default connect(mapStateToProps)(AddComment);
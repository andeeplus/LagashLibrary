import React, { Component } from 'react';
import DatabaseApi from '../../../services/dbApi'

class AddArticles extends Component {

  state = {
    idLabel: '',
    idArtist: '',
    idMaster: '',
    idRelease: '',
    link: '',
    title: '',
    imgArticle: '',
    type: ''
  }

  addDocs = (article) => DatabaseApi.addDocument('library',article)


  componentDidMount(){
    const {idLabel, type} = this.props
    this.setState({idLabel: idLabel.toString(),type})
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const { 
      idLabel,
      idArtist,
      idMaster,
      idRelease,
      link,
      title,
      imgArticle,
      type
    } = this.state;
    
    const articleUp = {
      idLabel,
      idArtist,
      idMaster,
      idRelease,
      link,
      title,
      imgArticle,
      type
    }

    this.addDocs(articleUp)

  }



  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <div className="addArticle">
          <label htmlFor="title"><b>Title</b></label>
            <input type="text" id="title" onChange={this.handleChange} placeholder="Title" required />
          <label htmlFor="link"><b>Link</b></label>
            <input type="text" id="link" onChange={this.handleChange} placeholder="Link to source" required />
          <label htmlFor="img"><b>Image</b></label>
            <input type="text" id="imgArticle" onChange={this.handleChange} placeholder="Image Link" required />
          <button className="buttonSubmit" type="submit">Submit</button>
        </div>
      </form>
      </div>
    );
  }
}

export default AddArticles;

// <label htmlFor="img"><b>Image</b></label>
// <input type="file" id="imgArticle" onChange={this.handleChange} />
// <input type="submit" value="Upload Image" />
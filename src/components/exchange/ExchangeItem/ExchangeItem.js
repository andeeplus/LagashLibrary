import React, { Component } from 'react';
import DatabaseApi from '../../../services/dbApi'

class ExchangeItem extends Component {

  state = {
    user: '',
    userName: '',
    userImg: '',
    title: '',
    catno: '',
    artist: '',
    year: '',
    id: '',
    titleOffer: '',
    offerDetail: '',
    type:''
  }

  addDocs = (exchangeItem) => DatabaseApi.addDocument('exchange',exchangeItem)


  componentDidMount(){
    const {results, type, user} = this.props
    this.setState({
      user: user.id,
      userName: user.userName,
      userImg: user.profilePic,
      title: results.title,
      catno: results.labels.map(i => [i.name,i.catno]).join(','),
      artist: results.artists_sort,
      year: results.year.toString(),
      idRelease: results.id.toString(),
      type: type
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const date = new Date()

    const { 
      user,
      userName,
      userImg,
      title,
      catno,
      artist,
      year,
      idRelease,
      titleOffer,
      offerDetail,
      type
    } = this.state;
    
    const exchangeItemUp = {
      user,
      userName,
      userImg,
      title,
      catno,
      artist,
      year,
      idRelease,
      titleOffer,
      offerDetail,
      type,
      date: date.toLocaleString(),
      dateNow: Date.now()
    }

    this.addDocs(exchangeItemUp)
    this.props.closeModal()
  }



  render() {
    return (
      <div className="add-exchangeItem-box">
      <form onSubmit={this.handleSubmit}>
        <div className="addArticle">
          <label htmlFor="titleOffer"><b>Offer Title</b></label>
            <input type="text" id="titleOffer" onChange={this.handleChange} placeholder="Title" required />
          <label htmlFor="offerDetail"><b>Info Exchange</b></label>
            <textarea className="textexchange" id="offerDetail" onChange={this.handleChange} placeholder="Describe the state of the record..." required />
          <button className="buttonSubmit" type="submit">Submit</button>
        </div>
      </form>
      </div>
    );
  }
}



export default ExchangeItem;

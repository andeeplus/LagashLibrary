import React, { Component } from 'react';
import {DiscogsApi} from '../../services/DiscogsApi'
import Loading from '../../components/Loading/Loading'
import RecordList from  '../../components/recordList/RecordList'
import Button from  '../../components/htmlElements/Button'

class SearchPage extends Component {

  state = {
    page: 1,
    perPage: 20,
    loading: true,
    queryDefault: 'pitch down',
    results: []
  }

  async fetchData(query = this.state.queryDefault){

    const urlData = {
      rootUrl: 'https://api.discogs.com/database/',
      search: 'search?q=',
      pages: '&page=',
      perPages: '&per_page=',
    }
    
    const {rootUrl, search, pages, perPages} = urlData
    const {page, perPage} = this.state
    const url = `${rootUrl}${search}${query}${pages}${page}${perPages}${perPage}`

    const results = await DiscogsApi.getQuery(url)
    this.setState({results: results.results, query: this.props.match.params.query, loading:false})

  }

  componentDidMount() {
    const {query} = this.props.match.params
    this.fetchData(query)
    window.scrollTo(0, 0)
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname){
      this.fetchData(this.props.match.params.query)
    }
  }

  changePage = (dir) => {

    let {page} = this.state
    
    dir === 'prev' && page <= 1 
    ? page = 1 
    : this.setState({page: page -1, loading: true},
      ()=>{this.fetchData(this.state.query)});

    dir === 'next' 
    && this.setState({page: page +1, loading: true},
      ()=>{this.fetchData(this.state.query)});

    window.scrollTo(0, 0)

  }

  render() {

    const {loading, results} = this.state

    return (
      loading ? <Loading /> :
      <div className="pages-blocks">
        <RecordList records={results} cardType={'big'}/>
        <div className="button-line-move">
          <Button options={{onclick: this.changePage, classname: 'butt-move', argument: 'prev'}}>Prev</Button>
          <Button options={{onclick: this.changePage, classname: 'butt-move', argument: 'next'}}>Next</Button>
        </div>
      </div>

    );
  }
}

export default SearchPage;

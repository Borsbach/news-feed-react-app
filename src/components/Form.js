import React, { Component } from 'react';

class Form extends Component {
  state = { 
    searchTerm: '',
    articles: []
  }
handleInput = (e) => {
  this.setState({ searchTerm: e.target.value })
}

handleSubmit = (e) =>  {
  e.preventDefault()
  fetch(`http://hn.algolia.com/api/v1/search?query=${this.state.searchTerm}`)
    .then(res => res.json())
    .then(news => { 
      this.setState({ searchTerm: '', articles: news.hits })
    })
}

  render() { 
    console.log(this.state.articles)
    return ( 
      <div>
        <h1>New Articles</h1>
        <form onSubmit={this.handleSubmit}>
          <label for="searchTerm">Search for: </label>
          <input 
          placeholder="Enter a search term..."
          onChange={this.handleInput}
          value={this.state.searchTerm.toUpperCase()}
          name="searchTerm" />
          <button type="submit">Search</button>
        </form>
        <div className="article-list">
          {this.state.articles.map((a, i) => {
            return (
              <div key={i} className="article">
                Title: <p>{a.title}</p>
                Author: <p>{a.author}</p>
                Article released on: <p>{a.created_at}</p>
                <a target="_blank" href={a.url}>Read more here</a>
              </div>
              )
          })}
        </div>
      </div>
      );
  }
}

export default Form;
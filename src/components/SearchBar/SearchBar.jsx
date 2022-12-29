import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';

export default class SearchBar extends Component {
  state = {
    query: '',
  };

  handleChange = e => this.setState({ query: e.target.value });

  handleSubmit = e => {
    e.preventDefault();

    const normalizedQuery = this.state.query.trim().toLowerCase();

    if (!normalizedQuery) {
      alert('enter the query');
      return;
    }

    this.props.onFormSubmit(normalizedQuery);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <BsSearch size={20} />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

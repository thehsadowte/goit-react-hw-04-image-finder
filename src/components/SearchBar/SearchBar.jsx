import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

const SearchBar = ({ onFormSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => setQuery(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();

    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      alert('enter the query');
      return;
    }

    onFormSubmit(normalizedQuery);
    setQuery('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <BsSearch size={20} />
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default SearchBar;

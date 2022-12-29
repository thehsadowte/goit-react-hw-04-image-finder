import { Component } from 'react';
import { getImages, normalizeImages } from 'services/api';

import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Spinner from './Spinner/Spinner';

export default class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    loading: false,
    error: '',
    totalImages: 0,
  };

  componentDidUpdate = async (_, prevState) => {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ loading: true, error: '' });
      try {
        const { hits, totalHits } = await getImages(query, page);

        const normalizedImages = normalizeImages(hits);

        this.setState(prevState => {
          return {
            images: [...prevState.images, ...normalizedImages],
            totalImages: totalHits,
          };
        });
      } catch (error) {
        this.setState({ error: 'something went wrong' });
      } finally {
        this.setState({ loading: false });
      }
    }

    // if (prevState.error !== error && error) {
    //   alert(error);
    // }
  };

  getQuery = query => {
    if (query === this.state.query) {
      alert('same query, try change your request');
      return;
    }
    this.setState({ query, images: [], page: 1 });
  };

  incrementPage = () => this.setState(prev => ({ page: prev.page + 1 }));

  render() {
    const { images, loading, totalImages, error } = this.state;
    const showLoadMore = images.length !== totalImages && !loading;

    return (
      <div className="App">
        <SearchBar onFormSubmit={this.getQuery} />

        {images.length > 0 && <ImageGallery images={images} />}

        {showLoadMore && <Button onClick={this.incrementPage} />}

        {loading && <Spinner />}

        {error && <p>{error}</p>}
      </div>
    );
  }
}

import { useEffect, useState } from 'react';
import { getImages, normalizeImages } from 'services/api';

import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import SearchBar from './SearchBar/SearchBar';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      setError('');

      try {
        const { hits, totalHits } = await getImages(query, page);

        const normalizedImages = normalizeImages(hits);

        setImages(prev => [...prev, ...normalizedImages]);

        setTotalImages(totalHits);

        if (totalHits === 0) {
          alert('Sorry, no images were found');
        }
      } catch (error) {
        setError('something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const getQuery = searchQuery => {
    if (searchQuery === query) {
      alert('same query, try change your request');
      return;
    }

    setQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const incrementPage = () => setPage(prev => prev + 1);

  const showLoadMore = images.length !== totalImages && !loading;

  return (
    <div className="App">
      <SearchBar onFormSubmit={getQuery} />

      {images.length > 0 && <ImageGallery images={images} />}

      {showLoadMore && <Button onClick={incrementPage} />}

      {loading && <Loader />}

      {error && <p>{error}</p>}
    </div>
  );
};

export default App;

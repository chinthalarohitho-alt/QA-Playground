
import React, { useState, useEffect, useCallback } from 'react';
import Button from '../components/Button';
import Spinner from '../components/Spinner';

const DynamicContentTestPage: React.FC = () => {
  const [showContent, setShowContent] = useState(false);
  const [loadingText, setLoadingText] = useState(false);
  const [dynamicText, setDynamicText] = useState('Initial text content.');
  const [itemCount, setItemCount] = useState(5);
  const [showImage, setShowImage] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Simulate loading text
  const handleLoadText = useCallback(() => {
    setLoadingText(true);
    setTimeout(() => {
      setDynamicText('This text has been dynamically loaded or updated after a delay!');
      setLoadingText(false);
    }, 2000);
  }, []);

  // Simulate infinite scroll / Load More
  const handleLoadMoreItems = useCallback(() => {
    // Simulate fetching new items
    setTimeout(() => {
      setItemCount((prevCount) => prevCount + 3);
    }, 1000);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    setImageError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageLoaded(false);
    setImageError(true);
  }, []);

  return (
    <section className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dynamic Content Playground</h2>
      <p className="mb-8 text-gray-600">
        This section is designed to test dynamic UI changes. Observe elements appearing/disappearing,
        text updates, loading states, and handling of images with different states.
      </p>

      {/* Toggle Content Visibility */}
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Toggle Visibility</h3>
      <Button
        onClick={() => setShowContent(!showContent)}
        variant="primary"
        className="mb-4"
        data-testid="toggle-content-btn"
      >
        {showContent ? 'Hide Content' : 'Show Content'}
      </Button>
      {showContent && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mb-8" data-testid="toggled-content">
          <p>This content appeared dynamically!</p>
          <ul className="list-disc list-inside mt-2">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
      )}
      {!showContent && (
        <p className="text-gray-500 italic mb-8" data-testid="hidden-content-message">Content is currently hidden.</p>
      )}

      {/* Dynamic Text Update with Loading */}
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Dynamic Text Update</h3>
      <div className="flex items-center space-x-4 mb-4">
        <Button onClick={handleLoadText} isLoading={loadingText} variant="secondary" data-testid="load-text-btn">
          {loadingText ? 'Loading...' : 'Load/Update Text'}
        </Button>
        <p className="text-lg" data-testid="dynamic-text">
          {dynamicText}
        </p>
      </div>
      {loadingText && <Spinner className="mb-8" data-testid="text-spinner" />}
      {!loadingText && !dynamicText.includes('updated') && (
        <p className="text-gray-500 italic mb-8">Click 'Load/Update Text' to see changes.</p>
      )}


      {/* Infinite Scroll / Load More */}
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Load More / Infinite Scroll Simulation</h3>
      <ul className="list-disc list-inside bg-gray-50 p-4 rounded-md mb-4" data-testid="item-list">
        {[...Array(itemCount)].map((_, index) => (
          <li key={index} data-testid={`list-item-${index}`}>
            List Item {index + 1}
          </li>
        ))}
      </ul>
      <Button onClick={handleLoadMoreItems} variant="outline" data-testid="load-more-btn">
        Load More Items
      </Button>
      <p className="text-sm text-gray-600 mt-2 mb-8">Currently showing {itemCount} items.</p>

      {/* Image Loading States */}
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Image Loading & Error States</h3>
      <div className="flex space-x-4 mb-4">
        <Button onClick={() => { setShowImage(true); setImageLoaded(false); setImageError(false); }} data-testid="show-image-btn">
          Show Valid Image
        </Button>
        <Button onClick={() => { setShowImage(true); setImageLoaded(false); setImageError(false); }} variant="danger" data-testid="show-broken-image-btn">
          Show Broken Image
        </Button>
        <Button onClick={() => setShowImage(false)} variant="secondary" data-testid="hide-image-btn">
          Hide Image
        </Button>
      </div>
      {showImage && (
        <div className="border border-gray-300 p-4 rounded-md max-w-sm mb-8">
          <p className="mb-2 text-sm text-gray-600">Image below:</p>
          {!imageLoaded && !imageError && (
            <div className="h-40 flex items-center justify-center bg-gray-100" data-testid="image-loading-spinner">
              <Spinner size="lg" />
            </div>
          )}
          {imageError && (
            <div className="h-40 flex items-center justify-center bg-red-50 text-red-700 border border-red-300" data-testid="image-error-state">
              <p>Image failed to load!</p>
            </div>
          )}
          {showImage && (
            <img
              src={Math.random() > 0.5 ? 'https://picsum.photos/400/200' : 'https://broken.picsum.photos/400/200'} // Simulate broken image
              alt="Dynamic example"
              className={`max-w-full h-auto rounded-md mt-2 ${!imageLoaded && !imageError ? 'hidden' : ''}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              data-testid="dynamic-image"
            />
          )}
          {imageLoaded && (
            <p className="mt-2 text-sm text-green-600" data-testid="image-loaded-message">Image loaded successfully!</p>
          )}
        </div>
      )}
      {!showImage && (
        <p className="text-gray-500 italic mb-8" data-testid="image-hidden-message">Image is currently hidden.</p>
      )}


    </section>
  );
};

export default DynamicContentTestPage;

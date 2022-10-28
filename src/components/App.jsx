import { useState, useEffect } from 'react';

import { GlobalStyle } from '../styles/GlobalStyle';
import { Box } from './Box';

import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

import { ErrorMessage } from './App.styled';

import { getNewItems, normalizeApi } from '../utils/Api';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [searchInput, setSearchInput] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (!searchInput) return;

    setIsLoader(true);
    setTotal(null);

    getNewItems(searchInput, page).then(({ hits, totalHits, total }) => {
      setItems(p => [...p, ...normalizeApi(hits)]);
      setTotalHits(totalHits);
      setIsLoader(false);
      setTotal(total);
    });
  }, [page, searchInput]);

  const handleSubmit = searchInput => {
    setSearchInput(searchInput);
    setItems([]);
    setPage(1);
  };

  const updatePage = () => {
    setPage(p => p + 1);
  };

  const loadMoreBtnTrue = items.length > 0 && items.length < totalHits;

  return (
    <Box pb={4}>
      <Searchbar onSubmit={handleSubmit} />

      {totalHits > 0 && <ImageGallery items={items} />}

      {total === 0 && <ErrorMessage>Sorry, not found</ErrorMessage>}

      {loadMoreBtnTrue && !isLoader ? <Button onClick={updatePage} /> : null}

      {isLoader && <Loader />}

      <GlobalStyle />
      <ToastContainer autoClose={1500} />
    </Box>
  );
};

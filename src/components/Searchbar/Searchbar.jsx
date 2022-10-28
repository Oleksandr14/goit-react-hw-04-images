import PropTypes from 'prop-types';
import { useState } from 'react';

import { AiOutlineSearch } from 'react-icons/ai';
import { Header, Input, ButtonForm } from './Searchbar.styled';

import { toast } from 'react-toastify';

export const Searchbar = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (input.trim() === '') {
      return toast.error('Enter a word', {
        theme: 'colored',
      });
    }

    onSubmit(input);
    setInput('');
  };

  return (
    <Header>
      <form onSubmit={handleSubmit}>
        <ButtonForm type="submit">
          <AiOutlineSearch size={16} color="#07c" />
        </ButtonForm>

        <Input
          type="text"
          value={input}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={e => setInput(e.target.value)}
        />
      </form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

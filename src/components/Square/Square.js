import React from 'react';
import './Square.css';
export const Square=({ value, onClick }) => (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
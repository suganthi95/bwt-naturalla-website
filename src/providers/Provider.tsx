import React from 'react';
import { BrowserRouter } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

export default function Provider({ children }: Props) {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
}

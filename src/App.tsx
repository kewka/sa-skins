import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import SkinPage from 'pages/SkinPage';

const App: React.FC = () => (
  <BrowserRouter>
    <Route path="/skins/:id(\d+)" component={SkinPage} />
  </BrowserRouter>
);

export default App;

import React, { useState } from 'react';
import Login from './components/login';
import Home from './components/Home';
import RegistroPets from './components/Registro';
import UpdatePets from './components/UpdatePets';
import MirarPets from './components/MirarPets';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path="/home" element={<Home />} />
            <Route path="/registro" element={<RegistroPets />} />
            <Route path="/actualizar/:id" element={<UpdatePets />} />
            <Route path="/buscar/:id" element={<MirarPets />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

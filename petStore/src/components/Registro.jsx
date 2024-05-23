import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import close from "../assets/imgs/btn-close.svg";
import fondo from "../assets/imgs/bg.svg";
import iconFoto from "../assets/imgs/icon-camera.svg";
import Agregar from '../assets/imgs/btn-save.svg';
import Foto from "../assets/imgs/photo-lg-0.svg";
import { useNavigate } from 'react-router-dom';

function RegistroPets() {
  const [formData, setFormData] = useState({
    nombre: '',
    race_id : '',
    fk_categories: '',
    gender_id: '',
    user_id: '', // Asigna el user_id si es necesario
  });
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [razas, setRazas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchRazas = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:3500/listarRace');
        console.log("Datos recibidos:", response.data);
        setRazas(response.data);
      } catch (error) {
        console.error('Error al cargar las razas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:3500/listarCategoria');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al cargar las categorías:', error);
      }
    };

    const fetchGeneros = async () => {
      try {
        const response = await axios.get('http://localhost:3500/listar-generos');
        setGeneros(response.data);
      } catch (error) {
        console.error('Error al cargar los géneros:', error);
      }
    };

    fetchRazas();
    fetchCategorias();
    fetchGeneros();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('nombre', formData.nombre);
    data.append('race_id', formData.race_id); // Corregido aquí, eliminado el espacio adicional
    data.append('fk_categories', formData.fk_categories);
    data.append('gender_id', formData.gender_id);
    data.append('user_id', formData.user_id);
    if (file) {
      data.append('photo', file);
    }
  
    try {
      const response = await axios.post('http://localhost:3500/RegistroPets', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error al registrar la mascota:', error);
    }
  };
  const cerrar = () => {
    navigate('/home');
  };


  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="relative overflow-hidden rounded-3xl shadow-lg bg-white">
      <div className="bg-cover bg-center" style={{ backgroundImage: `url(${fondo})`, height: "850px", width: "500px" }}></div>
      <div className="absolute inset-0 flex flex-col items-center justify-end mb-32">
        
      <div className="flex justify-between items-center mb-16 relative z-10 w-full h-16 pr-6">
          <h1 className="text-white text-lg pl-10">Registrar Mascota</h1>
          <button className="flex rounded-full w-8 h-8 justify-center items-center" onClick={cerrar}>
            <img src={close} alt="Cerrar" className="w-full h-full rounded-full" />
          </button>
        </div>

        <div className="flex justify-center items-center mb-28 mt-24">
          <img src={Foto} alt="Perro1" className="rounded-full w-32 h-32 absolute" />
        </div>

        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="bg-gray-400 w-full rounded-full flex items-center relative">
            <input
              type="text"
              placeholder="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="bg-transparent text-black placeholder-white rounded-full p-2  focus:outline-none focus:ring-2 focus:ring-blue-500 w-full "
              style={{ placeholderColor: 'white' }}
            />
          </div>

          <div className="bg-gray-400 w-full rounded-full flex items-center relative mt-5 h-10">
          <select
  name="race_id"
  value={formData.race_id}
  onChange={handleInputChange}
  className="bg-transparent text-black placeholder-white rounded-md p-2 w-full mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="" disabled>Seleccione una raza</option>
  {razas.map((raza) => (
    <option key={raza.race_id} value={raza.race_id}>
      {raza.name_race}
    </option>
  ))}
</select>

          </div>

          <div className="bg-gray-400 w-full h-10 rounded-full flex items-center relative z-10 mt-4">
            <select
              name="fk_categories"
              value={formData.fk_categories}
              onChange={handleInputChange}
              className="bg-transparent text-black placeholder-white rounded-md p-2 w-full mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Seleccione una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id_category } value={categoria.id_category}>
                  {categoria.name_category}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gray-400 w-full h-10 rounded-full flex items-center relative z-10 mt-4">
            <select
              name="gender_id"
              value={formData.gender_id}
              onChange={handleInputChange}
              className="bg-transparent text-black placeholder-white rounded-md p-2  w-full mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Seleccione un género</option>
              {generos.map((genero) => (
                <option key={genero.id_gender } value={genero.id_gender}>
                  {genero.name_gender}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gray-400 w-full h-10 rounded-full flex items-center relative z-10 mt-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <input
              type="text"
              placeholder="Cambiar Foto"
              className="bg-transparent text-black placeholder-white rounded-md p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ placeholderColor: 'white' }}
              readOnly
            />
            <div className="ml-auto flex space-x-2">
              <button type="button" onClick={handleButtonClick}>
                <img src={iconFoto} alt="Mostrar" className="w-14 h-5 rounded-r-full bg-gray-400 flex items-center px-2" />
              </button>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button type="submit" className=" w-30 h-10 rounded-full flex items-center relative z-10">
              <img src={Agregar} alt="Agregar" className="w-full h-full rounded-r-full flex items-center px-2" />
            </button>
          </div>
        </form>
      </div>
      
    </div>
  </div>
  );
}

export default RegistroPets;


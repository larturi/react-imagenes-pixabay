import React, { useState, useEffect } from 'react';
import { Formulario } from './components/Formulario';
import { Imagenes } from './components/Imagenes';

function App() {
   const [busqueda, setBusqueda] = useState('');
   const [imagenes, setImagenes] = useState([]);
   const [paginaactual, setPaginaActual] = useState(1);
   const [totalpaginas, setTotalPaginas] = useState(1);

   useEffect(() => {
      const consultarApi = async () => {
         if (busqueda === '') return;

         const perPage = 30;
         const key = '20621374-eed9064f0ece7f385fd3ee1c6';
         const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${perPage}&page=${paginaactual}`;

         const respuesta = await fetch(url);
         const resultado = await respuesta.json();

         setImagenes(resultado.hits);

         const calcularTotalPaginas = Math.ceil(resultado.totalHits / perPage);
         setTotalPaginas(calcularTotalPaginas);

         const jumbotron = document.querySelector('.jumbotron');
         jumbotron.scrollIntoView({ behavior: 'smooth' });
      };
      consultarApi();
   }, [busqueda, paginaactual]);

   const paginaAnterior = () => {
      const nuevaPaginaActual = paginaactual - 1;
      if (nuevaPaginaActual === 0) return;
      setPaginaActual(nuevaPaginaActual);
   };

   const paginaSiguiente = () => {
      const nuevaPaginaActual = paginaactual + 1;
      if (nuevaPaginaActual === totalpaginas + 1) return;
      setPaginaActual(nuevaPaginaActual);
   };

   return (
      <div className='App'>
         <div className='container'>
            <div className='jumbotron'>
               <p className='lead text-center'>Buscador de Imagenes</p>

               <Formulario setBusqueda={setBusqueda} />
            </div>

            <div className='row justify-content-center'>
               {totalpaginas > 0 ? (
                  <Imagenes imagenes={imagenes} />
               ) : (
                  <p>{`No se han encontrado imágenes de "${busqueda}"`}</p>
               )}

               {totalpaginas === 0 || paginaactual === 1 ? null : (
                  <button
                     type='button'
                     className='btn btn-info mr-1'
                     onClick={paginaAnterior}
                  >
                     {' '}
                     Anterior{' '}
                  </button>
               )}

               {totalpaginas === 0 || paginaactual === totalpaginas ? null : (
                  <button
                     type='button'
                     className='btn btn-info'
                     onClick={paginaSiguiente}
                  >
                     {' '}
                     Siguiente{' '}
                  </button>
               )}
            </div>
         </div>
      </div>
   );
}

export default App;

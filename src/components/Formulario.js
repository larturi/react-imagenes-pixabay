import React, { useState } from 'react';
import { Error } from './Error';

export const Formulario = ({ setBusqueda }) => {

    const [ termino, setTermino ] = useState('');
    const [ error, setError ] = useState(false);

    const buscarImagenes = e => {
        e.preventDefault();
        
        if (termino.trim() ==='') {
            setError(true);
            return;
        }

        setError(false);
        setBusqueda(termino.trim());

    }

    return (
        <form
            onSubmit={buscarImagenes}
        >
            <div className="row">
                <div className="col-md-8 form-group">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen"
                        onChange={ e => setTermino( e.target.value )}
                    />
                </div>

                <div className="col-md-4 form-group">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>

            {
                ( error ) ? <Error mensaje="Ingresa un termino de busqueda" /> : null
            }
        </form>
    )
}

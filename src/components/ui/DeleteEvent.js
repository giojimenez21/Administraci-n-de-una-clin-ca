import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarTimes } from '@fortawesome/free-solid-svg-icons';
import { startDeleteEvent } from '../../actions/recep';
import Swal from 'sweetalert2';

export const DeleteEvent = () => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        Swal.fire({
            title: 'Cuidado',
            text: `¿Está seguro de eliminar esta cita?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, acepto.',
            cancelButtonText: 'Cancelar.'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startDeleteEvent());
            }
        });

    }

    return (
        <button
            className='fixed bottom-5 left-5 rounded-full bg-red-500 text-center px-5 py-4 text-white text-2xl z-10'
            onClick={handleDelete}
        >
            <FontAwesomeIcon icon={faCalendarTimes} />
        </button>
    )
}

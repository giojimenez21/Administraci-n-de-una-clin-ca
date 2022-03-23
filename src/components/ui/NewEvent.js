import React from 'react'
import { useDispatch } from 'react-redux';
import { startOpenModal } from '../../actions/ui';

export const NewEvent = () => {
    const dispatch = useDispatch();
    const openModal = () => {
        dispatch(startOpenModal());
    }

    return (
        <button
            className='fixed bottom-5 right-5 rounded-full bg-red-500 text-center px-6 py-4 text-white text-2xl z-10'
            onClick={openModal}
        >
            +
        </button>
    )
}

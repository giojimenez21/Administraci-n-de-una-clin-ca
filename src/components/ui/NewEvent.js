import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startOpenModal } from '../../actions/ui';

export const NewEvent = () => {
    const dispatch = useDispatch();
    const openModal = () => {
        dispatch(startOpenModal());
    }

    const { activeEvent } = useSelector(state => state.recep);

    return (
        <button
            className='fixed bottom-5 right-5 rounded-full bg-blue-500 text-center px-5 py-4 text-white text-2xl z-10'
            onClick={openModal}
        >
            <FontAwesomeIcon icon={Object.keys(activeEvent).length === 0 ? faPlus : faEdit} />
        </button>
    )
}

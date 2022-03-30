import {combineReducers} from 'redux';
import { authReducer } from './authReducer';
import {adminReducer} from './adminReducer';
import { uiReducer } from './uiReducer';
import { recepcionistReducer } from './recepcionistReducer';
import { medicoReducer } from './medicoReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    admin: adminReducer,
    recep: recepcionistReducer,
    ui: uiReducer,
    md: medicoReducer
});


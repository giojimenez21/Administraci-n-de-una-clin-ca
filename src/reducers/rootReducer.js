import {combineReducers} from 'redux';
import { authReducer } from './authReducer';
import {adminReducer} from './adminReducer';
import { uiReducer } from './uiReducer';
import { recepcionistReducer } from './recepcionistReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    admin: adminReducer,
    recep: recepcionistReducer,
    ui: uiReducer
});


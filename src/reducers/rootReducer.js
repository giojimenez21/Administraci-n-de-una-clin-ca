import {combineReducers} from 'redux';
import { authReducer } from './authReducer';
import {adminReducer} from './adminReducer';
import { uiReducer } from './uiReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    admin: adminReducer,
    ui: uiReducer
});


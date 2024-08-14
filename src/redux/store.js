import { legacy_createStore as createStore } from 'redux';
import restaurantReducer from './reducer';

const store = createStore(restaurantReducer);

export default store;

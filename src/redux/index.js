//aqui creamos el store de redux

import { applyMiddleware, combineReducers, createStore } from "redux";
import * as reducers from './reducer'
import * as actionCreators from './actions'
import {composeWithDevTools} from '@redux-devtools/extension'
import thunk from 'redux-thunk';
import * as auth from '../api/serviceLogin';
import * as travels from '../api/serviceTravels';

const reducer = combineReducers(reducers)

const composeEnhancers = composeWithDevTools({
    //configiracion de devtools
    actionCreators
})

export default function configureStore(preloadedState, { router }) {
    const middleware = [
      thunk.withExtraArgument({ api: { auth, travels }, router }),
    ];
    //para importar desde fuera y decidir desde fuera como crear el store como nos covenga mas
    const store = createStore(
      reducer,
      preloadedState, //aqui le pasamos si hay token o no de principio
      composeEnhancers(applyMiddleware(...middleware)), //para que funcione las devtools de redux
    );
    return store;
  }
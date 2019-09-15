import { createEpicMiddleware }         from 'redux-observable';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer, rootEpic }        from 'models';

const epicMiddleware = createEpicMiddleware();
const store          = createStore(rootReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);

export default store;
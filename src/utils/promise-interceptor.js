import { show_spinner, hide_spinner } from './../actions/spinner';

/**
 * A simple functoin that checks if our value is an actual Promise object
 * @param {Promise?} val 
 */
function isPromise(val) {
  return val && typeof val.then === 'function';
}

/**
 * A Promise action wrapper. it dispatches the action and allow us to do
 * All kind of things before and after request is done, like showing 
 * Loaders or handling errors.
 * @param {redux dispatch function} dispatch 
 * @param {an action with a Promise payload} promiseAction 
 */
export function promiseInterceptor(dispatch, promiseAction) {
    if(isPromise(promiseAction.payload)){
        dispatch(show_spinner());
        return dispatch(promiseAction).then(resolve => {
            dispatch(hide_spinner());         
            return resolve;
        })
    }else {
        return promiseAction;
    }
}
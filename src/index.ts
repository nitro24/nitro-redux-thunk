import { Middleware, MiddlewareAPI, Dispatch, AnyAction, Action } from 'redux';

export type ThunkAction<R, S extends Action = AnyAction> = (dispatch: Dispatch<S>, getState: () => S) => R;

const thunk: Middleware = <S, D extends Dispatch = Dispatch>(store: MiddlewareAPI<D, S>) =>
  (next: Dispatch<AnyAction>) => (action: any): any => {
    if (typeof action === 'function') {
      return action(store.dispatch, store.getState);
    }
    return next(action);
  };

export default thunk;

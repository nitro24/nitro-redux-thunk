import { Middleware, MiddlewareAPI, Dispatch, AnyAction, Action } from 'redux';

export interface ThunkDispatch<S = any, A extends Action = AnyAction> {
  <T extends A>(action: T): T;
  <R, S>(asyncAction: ThunkAction<R, S, A>): R;
}

export type ThunkAction<R = {}, S = any, A extends Action = AnyAction> = (
  dispatch: ThunkDispatch<S, A>,
  getState: () => S,
) => R;

export type ThunkMiddleware<S = any, A extends Action = AnyAction> =
  Middleware<ThunkDispatch<S, A>, S, ThunkDispatch<S, A>>;

const thunk: ThunkMiddleware = <S = any, A extends Action = AnyAction>(store: MiddlewareAPI<ThunkDispatch<S, A>, S>) =>
(next: Dispatch<AnyAction>) => (action: any): any => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};

export default thunk;

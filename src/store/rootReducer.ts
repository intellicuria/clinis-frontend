import { combineReducers, CombinedState, AnyAction, Reducer } from "redux";
import base, { BaseState } from "./slices/base";
import dialog, { DialogState } from "./slices/dialog/dialogSlice";
import RtkQueryService from "@/lib/actions/RtkQueryService";

export type RootState = CombinedState<{
  base: CombinedState<BaseState>;
  dialog: DialogState;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  [RtkQueryService.reducerPath]: any;
}>;

export interface AsyncReducers {
  [key: string]: Reducer<any, AnyAction>;
}

const staticReducers = {
  base,
  dialog,
  // visit,
  [RtkQueryService.reducerPath]: RtkQueryService.reducer,
};

const rootReducer =
  (asyncReducers?: AsyncReducers) => (state: RootState, action: AnyAction) => {
    const combinedReducer = combineReducers({
      ...staticReducers,
      ...asyncReducers,
    });
    return combinedReducer(state, action);
  };

export default rootReducer;

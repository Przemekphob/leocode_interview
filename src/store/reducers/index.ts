import { combineReducers } from "redux";
import { universitiesReducer, UniversitiesReducerType } from "./universitiesReducer";

export interface RootReducer {
  universities: UniversitiesReducerType;
}

const reducers = combineReducers( {
  universities: universitiesReducer,
} );

export default reducers;

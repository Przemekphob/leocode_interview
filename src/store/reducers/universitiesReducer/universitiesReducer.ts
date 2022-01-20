import { GetUniversitiesStateType } from "../../../types/universities";
import { GetUniversitiesActions } from "../../actions";
import { GetUniversitiesActionTypesEnum } from "../../actionTypes";

const initialState: GetUniversitiesStateType = {
  isProgress: false,
  list: [],
};

export type UniversitiesReducerType = ReturnType<typeof universitiesReducer>;

export const universitiesReducer = ( state: GetUniversitiesStateType = initialState, action: GetUniversitiesActions ): GetUniversitiesStateType => {
  switch ( action.type ) {
    case GetUniversitiesActionTypesEnum.GET_UNIVERSITIES_ACTION_REQUEST:
      return {
        ...state,
        isProgress: true,
      };
    case GetUniversitiesActionTypesEnum.GET_UNIVERSITIES_ACTION_RESPONSE:
      return {
        isProgress: false,
        list: action.payload,
      };
    case GetUniversitiesActionTypesEnum.GET_UNIVERSITIES_ACTION_ERROR:
      return state;
    default:
      return state;
  }
};

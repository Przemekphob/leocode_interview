import { UniversitiesParamsType, UniversitiesType } from "../../../types/universities";
import { GetUniversitiesActionTypesEnum as CONSTANTS } from "../../actionTypes/index";

const { GET_UNIVERSITIES_ACTION_REQUEST, GET_UNIVERSITIES_ACTION_RESPONSE, GET_UNIVERSITIES_ACTION_ERROR } = CONSTANTS;

export interface GetUniversitiesRequestAction {
  type: CONSTANTS.GET_UNIVERSITIES_ACTION_REQUEST,
  payload: UniversitiesParamsType,
}

export const getUniversitiesRequest = ( params: UniversitiesParamsType ): GetUniversitiesRequestAction => ( {
  type: GET_UNIVERSITIES_ACTION_REQUEST,
  payload: params,
} );

export interface GetUniversitiesResponseAction {
  type: CONSTANTS.GET_UNIVERSITIES_ACTION_RESPONSE,
  payload: UniversitiesType[],
}

export const getUniversitiesResponse = ( universities: UniversitiesType[] ): GetUniversitiesResponseAction => ( {
  type: GET_UNIVERSITIES_ACTION_RESPONSE,
  payload: universities,
} );

export interface GetUniversitiesErrorAction {
  type: CONSTANTS.GET_UNIVERSITIES_ACTION_ERROR,
}

export const getUniversitiesError = ( ): GetUniversitiesErrorAction => ( {
  type: GET_UNIVERSITIES_ACTION_ERROR,
} );

export type GetUniversitiesActions = GetUniversitiesRequestAction | GetUniversitiesResponseAction | GetUniversitiesErrorAction;

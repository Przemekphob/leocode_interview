export interface UniversitiesParamsType {
  name: string;
}

export interface UniversitiesType {
  country: string;
  name: string;
}

export interface UniversitiesCheckedType extends UniversitiesType {
  checked: boolean;
}

export interface GetUniversitiesStateType {
  isProgress: boolean,
  list: UniversitiesType[],
}

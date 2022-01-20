import axios from "axios";
import { UniversitiesParamsType, UniversitiesType } from "../types/universities";

export const getUniversitiesService = async ( params: UniversitiesParamsType ): Promise<UniversitiesType[]> => {
  try {
    const { data }: { data: UniversitiesType[] } = await axios.get( "http://universities.hipolabs.com/search", {
      params: { name: params.name },
    } );

    const response = data.filter( ( item: UniversitiesType, index: number, self: UniversitiesType[] ) => self.findIndex(
      ( t: UniversitiesType ) => ( t.name === item.name ),
    ) === index );

    return response;
  } catch ( error ) {
    console.warn( error );
    return [];
  }
};

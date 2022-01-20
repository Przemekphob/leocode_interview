import { styled } from "@mui/material";
import List from "@mui/material/List";
import { useEffect, useState } from "react";
import { UniversitiesCheckedType } from "../../types/universities";
import SavedListItem from "../SavedListItem";

interface Props {
  list: UniversitiesCheckedType[];
}

const StyledList = styled( List )( {
  maxHeight: " 200px",
  overflow: "auto",
  padding: "0",
} );

export const SavedListItems = ( { list }: Props ): JSX.Element => {
  const [newList, setNewList] = useState<UniversitiesCheckedType[]>( [] );

  useEffect( () => {
    setNewList( list );
  }, [list] );

  const renderList = (): JSX.Element[] => newList.map( ( item: UniversitiesCheckedType ) => (
    <SavedListItem
      key={item.name}
      item={item}
    />
  ) );

  return (
    <StyledList>
      {renderList()}
    </StyledList>
  );
};

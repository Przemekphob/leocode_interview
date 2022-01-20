import { Box, styled } from "@mui/material";
import List from "@mui/material/List";
import { MouseEvent, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { UniversitiesCheckedType } from "../../types/universities";
import InfiniteScrollListItem from "../InfiniteScrollListItem";

interface Props {
  list: UniversitiesCheckedType[];
  clickListItem: ( event: MouseEvent<HTMLButtonElement> ) => void;
  input: string;
}

const StyledList = styled( List )( {
  height: " 300px",
  overflow: "auto",
  padding: "0",
} );

export const ListItemsInfinieScroll = ( { list, clickListItem, input }: Props ): JSX.Element => {
  const [newList, setNewList] = useState<UniversitiesCheckedType[]>( [] );
  const [page, setPage] = useState<number>( 1 );

  useEffect( () => {
    setNewList( list.slice( 0, 50 ) );
  }, [list] );

  const renderList = (): JSX.Element[] => newList.map( ( item: UniversitiesCheckedType ) => (
    <InfiniteScrollListItem
      key={item.name}
      item={item}
      clickListItem={clickListItem}
    />
  ) );

  const loadMore = (): void => {
    setPage( page + 1 );
    const pages = ( page + 1 ) * 50;
    setNewList( list.slice( 0, pages ) );
  };

  return (
    <StyledList>
      {input.length > 0 && newList.length > 0 && (
      <InfiniteScroll
        dataLength={newList.length}
        next={loadMore}
        hasMore={list.length > newList.length}
        loader={<Box key={0}>Loading...</Box>}
        height={!list.length ? 0 : 300}
      >
        {renderList()}
      </InfiniteScroll>
      )}
    </StyledList>
  );
};

import {
  Box, ListItem, styled, Button,
} from "@mui/material";
import { MouseEvent } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { UniversitiesCheckedType } from "../../types/universities";

interface Props {
  item: UniversitiesCheckedType;
  clickListItem: ( event: MouseEvent<HTMLButtonElement> ) => void;
}

const StyledListItem = styled( ListItem )( ( { theme } ) => ( {
  padding: "0",
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginLeft: "25px",
  width: "auto",
  "&:last-child": {
    borderBottom: "0",
  },
  cursor: "pointer",
} ) );

const StyledButton = styled( Button )( {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  "& > div": {
    padding: "0 8px",
    display: "flex",
  },
  textAlign: "left",
} );

export const InfiniteScrollListItem = ( { item, clickListItem }: Props ): JSX.Element => (
  <StyledListItem>
    <StyledButton onClick={clickListItem} sx={{ fontWeight: item.checked ? 700 : 400 }} value={item.name}>
      {item.name}
      <Box>{item.checked && <CheckIcon />}</Box>
    </StyledButton>
  </StyledListItem>
);

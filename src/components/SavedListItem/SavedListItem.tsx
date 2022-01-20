import {
  Box, ListItem, styled,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { UniversitiesCheckedType } from "../../types/universities";

interface Props {
  item: UniversitiesCheckedType;
}

const StyledListItem = styled( ListItem )( ( { theme } ) => ( {
  padding: "6px 8px",
  borderBottom: `1 solid ${theme.palette.divider}`,
  marginLeft: "25px",
  width: "auto",
  "&:last-child": {
    borderBottom: "0",
  },
  textTransform: "uppercase",
} ) );

const StyledBox = styled( Box )( {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  "& > div": {
    padding: "0 8px",
    display: "flex",
  },
  textAlign: "left",
} );

export const SavedListItem = ( { item }: Props ): JSX.Element => (
  <StyledListItem>
    <StyledBox sx={{ fontWeight: item.checked ? 700 : 400 }}>
      {item.name}
      <Box>{item.checked && <CheckIcon />}</Box>
    </StyledBox>
  </StyledListItem>
);

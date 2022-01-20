import { ChangeEvent } from "react";
import {
  Box, styled, TextField,
} from "@mui/material";

const StyledInputWrapper = styled( Box )( {
  padding: "8px",
  borderTop: "0",
  width: "304px",
  maxWidth: "304px",
} );

const StyledTextField = styled( TextField )( {
  width: "100%",
} );

interface Props {
  handleChange: ( event: ChangeEvent<HTMLInputElement> ) => void;
  value: string;
}

export const SearchInput = ( { handleChange, value }: Props ): JSX.Element => (
  <StyledInputWrapper>
    <StyledTextField label="Universities" variant="outlined" onChange={handleChange} autoComplete="off" value={value} />
  </StyledInputWrapper>
);

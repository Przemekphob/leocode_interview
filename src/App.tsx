import {
  Box, createTheme, styled, ThemeProvider,
} from "@mui/material";
import "./App.css";
import MenuWrapper from "./components/MenuWrapper";

const StyledComponentWrapper = styled( Box )( {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: "50px",
} );

const theme = createTheme( {
  palette: {
    primary: {
      main: "#000",
    },
    common: {
      black: "#000",
      white: "#fff",
    },
    divider: "#BEBEBE",
  },
} );

const App = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <StyledComponentWrapper>
      <MenuWrapper />
    </StyledComponentWrapper>
  </ThemeProvider>
);

export default App;

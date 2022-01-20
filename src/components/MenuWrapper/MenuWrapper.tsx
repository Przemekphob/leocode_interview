import {
  ChangeEvent,
  useEffect,
  useState,
  MouseEvent,
} from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box, Button, LinearProgress, styled,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import OutsideClickHandler from "react-outside-click-handler";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import _ from "lodash";
import SearchInput from "../SearchInput";
import { actionCreators } from "../../store";
import ListItemsInfinieScroll from "../ListItemsInfinieScroll";
import { RootReducer } from "../../store/reducers";
import { UniversitiesCheckedType, UniversitiesType } from "../../types/universities";
import SavedListItems from "../SavedListItems";

const StyledWrapper = styled( Box )( {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "320px",
  maxWidth: "320px",
  position: "relative",
} );

const StyledButton = styled( Button )( ( { theme } ) => ( {
  width: "100%",
  "&:hover": {
    backgroundColor: `${theme.palette.common.white}`,
  },
  textTransform: "none",
} ) );

const StyledTopWrapper = styled( Box )( {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
} );

const StyledOptionsBox = styled( Box )( ( { theme } ) => ( {
  position: "absolute",
  top: "38px",
  zIndex: "999",
  border: `1px solid ${theme.palette.common.black}`,
  borderTop: "0",
} ) );

const StyledResetButton = styled( Button )( ( { theme } ) => ( {
  width: "100%",
  borderRadius: "0",
  padding: "10px 0",
  backgroundColor: `${theme.palette.common.black}`,
  color: `${theme.palette.common.white}`,
  "&:hover": {
    backgroundColor: `${theme.palette.common.black}`,
  },
} ) );

const StyledLoaderWrapper = styled( Box )( {
  minHeight: "5px",
} );

const StyledCounter = styled( Box )( ( { theme } ) => ( {
  margin: "0 3px",
  padding: "0 3px",
  backgroundColor: `${theme.palette.common.black}`,
  color: `${theme.palette.common.white}`,
  minWidth: "8px",
} ) );

export const MenuWrapper = (): JSX.Element => {
  const dispatch = useDispatch();
  const { getUniversitiesRequest } = bindActionCreators( actionCreators, dispatch );
  const universities = useSelector( ( state: RootReducer ) => state.universities );
  const { list, isProgress } = universities;
  const [open, setOpen] = useState<boolean>( false );
  const [inputValue, setInputValue] = useState<string>( "" );
  const handleOpen = (): void => setOpen( !open );
  const [listDataLoaded, setListDataLoaded] = useState<boolean>( false );
  const [listData, setListData] = useState<UniversitiesCheckedType[]>( [] );
  const [savedListData, setSavedListData] = useState<UniversitiesCheckedType[]>( [] );
  const [unsavedListData, setUnsavedListData] = useState<UniversitiesCheckedType[]>( [] );
  const [allSavedData, setAllSavedData] = useState<UniversitiesCheckedType[]>( [] );

  const StyledButtonWrapper = styled( Box )( ( { theme } ) => ( {
    border: `1px solid ${theme.palette.common.black}`,
    borderBottom: open ? "0" : `1px solid ${theme.palette.common.black}`,
    display: "flex",
    justifyContent: "flex-start",
    width: "160px",
  } ) );

  const StyledEmptyBox = styled( Box )( ( { theme } ) => ( {
    borderBottom: open ? `1px solid ${theme.palette.common.black}` : "0",
    width: "160px",
  } ) );

  const handleInputChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    const { value } = event.target;
    if ( value ) {
      setInputValue( value );
    } else {
      setInputValue( "" );
    }
  };

  const removeSavedDuplicates = (): UniversitiesCheckedType[] => _.uniqBy( savedListData.concat( allSavedData ), "name" );

  useEffect( () => {
    setAllSavedData( removeSavedDuplicates() );
  }, [savedListData] );

  useEffect( () => {
    if ( inputValue.length > 0 ) {
      getUniversitiesRequest( { name: inputValue } );
    } else {
      setSavedListData( allSavedData );
    }
  }, [inputValue] );

  const savedFiltered = ( toFilter: UniversitiesCheckedType[], filterBy: UniversitiesCheckedType[] ) => toFilter.filter( (
    saved: UniversitiesCheckedType,
  ) => filterBy.some( ( unsaved: UniversitiesCheckedType ) => unsaved.name === saved.name && saved.checked ) );

  const unsavedFiltered = ( toFilter: UniversitiesCheckedType[], filterBy: UniversitiesCheckedType[] ) => toFilter.filter( (
    unsaved: UniversitiesCheckedType,
  ) => !filterBy.some( ( saved: UniversitiesCheckedType ) => saved.name === unsaved.name && saved.checked ) );

  useEffect( () => {
    const listInitialChecked = list.map( ( item: UniversitiesType ): UniversitiesCheckedType => ( { ...item, checked: false } ) );
    setListData( listInitialChecked );
    setListDataLoaded( true );
  }, [list] );

  const handleDataAfterInputChange = () => {
    setUnsavedListData( unsavedFiltered( listData, allSavedData ) );
    setSavedListData( savedFiltered( allSavedData, listData ) );
  };

  useEffect( () => {
    if ( listDataLoaded ) {
      if ( allSavedData.length > 0 ) {
        handleDataAfterInputChange();
      } else {
        setSavedListData( savedFiltered( allSavedData, listData ) );
        setUnsavedListData( listData );
      }
      setListDataLoaded( false );
    }
  }, [listDataLoaded] );

  const closeComponent = (): void => setOpen( false );

  useEffect( () => {
    const handleEsc = ( event: { keyCode: number; } ) => {
      if ( event.keyCode === 27 ) {
        setOpen( false );
      }
    };
    window.addEventListener( "keydown", handleEsc );

    return () => {
      window.removeEventListener( "keydown", handleEsc );
    };
  }, [] );

  const clearData = (): void => {
    setListData( [] );
    setInputValue( "" );
    setAllSavedData( [] );
    setSavedListData( [] );
  };

  const count = listData.filter( ( item: UniversitiesCheckedType ) => item.checked );

  const clickListitemUnsaved = ( event: MouseEvent<HTMLButtonElement> ): void => {
    const { value } = event.currentTarget;
    const newListData = listData.map( ( item: UniversitiesCheckedType ): UniversitiesCheckedType => (
      item.name === value ? { ...item, checked: true } : { ...item }
    ) );

    const savedData = newListData.filter( ( item: UniversitiesCheckedType ) => item.checked );
    const unsavedData = newListData.filter( ( item: UniversitiesCheckedType ) => !item.checked );

    const concatData = [...savedListData, ...savedData, ...allSavedData];
    const removeDuplicates = _.uniqBy( concatData, "name" );

    setListData( unsavedData );
    setSavedListData( removeDuplicates );
    setUnsavedListData( unsavedFiltered( unsavedData, removeDuplicates ) );
  };

  const renderOptions = (): JSX.Element => (
    <OutsideClickHandler onOutsideClick={closeComponent}>
      <StyledOptionsBox>
        <SearchInput handleChange={handleInputChange} value={inputValue} />
        <StyledLoaderWrapper>
          {isProgress && <LinearProgress />}
        </StyledLoaderWrapper>
        <SavedListItems list={savedListData} />
        <ListItemsInfinieScroll list={unsavedListData} clickListItem={clickListitemUnsaved} input={inputValue} />
        <StyledResetButton onClick={clearData}>Reset</StyledResetButton>
      </StyledOptionsBox>
    </OutsideClickHandler>
  );

  return (
    <StyledWrapper>
      <StyledTopWrapper>
        <StyledButtonWrapper>
          <StyledButton disableRipple onClick={handleOpen}>
            Universities
            <StyledCounter>
              {count.length > 0 && count.length}
            </StyledCounter>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </StyledButton>
        </StyledButtonWrapper>
        <StyledEmptyBox />
      </StyledTopWrapper>
      {open && renderOptions()}
    </StyledWrapper>
  );
};

import { deleteSelected } from "./Actions";
import {
  DELETE_SELECTED,
  END_EDITABLE,
  GET_DATA_FAILURE,
  GET_DATA_REQ,
  GET_DATA_SUCCESS,
  ITEM_CHECKED,
  ITEM_UNCHECKED,
  PAGE_CHANGED,
  SEARCH_TERM,
  SET_ALL_SELECT_PAGE_NO,
  START_EDITABLE,
  TOGGLE_EDITABLE,
} from "./ActionTypes";

const initState = {
  data: [],
  filteredData: [],
  isLoading: false,
  isError: false,
  currPage: 1,
  selectedIds: [],
  allSelectPageNo: "",
  editableIds: [],
};

export const Reducer = (state = initState, { type, payload }) => {
  function filterBySearchTerm(arr, term) {
    term = term.toLowerCase();
    return arr.filter((person) => {
      return (
        person.email.toLowerCase().includes(term) ||
        person.name.toLowerCase().includes(term) ||
        person.role.toLowerCase().includes(term)
      );
    });
  }

  function deleteSelected(data, selectedIds, marker) {
    if (marker == "master")
      data = data.filter((el) => !selectedIds.includes(el.id));
    else if (marker == "filter")
      data = data.filter((el) => !selectedIds.includes(el.id));
    return data;
  }

  switch (type) {
    case GET_DATA_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case GET_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload,
        filteredData: payload,
      };
    case GET_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case SEARCH_TERM:
      return {
        ...state,
        isLoading: false,
        isError: false,
        filteredData: filterBySearchTerm(state.data, payload),
      };
    case PAGE_CHANGED:
      return {
        ...state,
        currPage: payload,
      };
    case ITEM_CHECKED:
      return {
        ...state,
        selectedIds: [...state.selectedIds, payload],
      };
    case ITEM_UNCHECKED:
      return {
        ...state,
        selectedIds: state.selectedIds.filter((el) => el != payload),
      };
    case DELETE_SELECTED:
      return {
        ...state,
        data: deleteSelected(state.data, state.selectedIds, "master"),
        selectedIds: [],
        filteredData: deleteSelected(
          state.filteredData,
          state.selectedIds,
          "filter"
        ),
      };

    case SET_ALL_SELECT_PAGE_NO:
      console.log(payload);
      return {
        ...state,
        allSelectPageNo: payload,
      };
    case START_EDITABLE:
      return {
        ...state,        
        editableIds:[...state.editableIds,payload]
      };
    case END_EDITABLE:
      return {
        ...state,        
        editableIds:state.editableIds.filter(el=>el!=payload)
      };
    default:
      return state;
  }
};

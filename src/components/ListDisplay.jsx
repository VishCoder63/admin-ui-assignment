import { useDispatch, useSelector } from "react-redux";
import styles from "./css/listDisplay.module.css";

import { maxRowsPerPage } from "../constants";
import {
  deleteSelected,
  endEdit,
  itemChecked,
  itemUnchecked,
  setAllSelectPageNo,
  startEdit,
  toggleEditable,
} from "../Redux/Actions";
import { Row } from "./Row";
export function ListDisplay() {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  function isValidIndex(index) {
    const pageLowerLimit = maxRowsPerPage * (data.currPage - 1);
    const pageUpperLimit = maxRowsPerPage * data.currPage - 1;
    return index >= pageLowerLimit && index <= pageUpperLimit;
  }
  function handleCheck(isChecked, id) {
    if (isChecked) dispatch(itemChecked(id));
    else dispatch(itemUnchecked(id));
  }

  function handleAllSelect(e) {
    dispatch(setAllSelectPageNo(data.currPage));
    data.filteredData.map((el, index) => {
      isValidIndex(index) && handleCheck(e.target.checked, el.id);
    });
  }

  function handleEditClick(id) {
    if (data.editableIds.includes(id)) dispatch(endEdit(id));
    else dispatch(startEdit(id));
  }
  function handleDeleteClick(id) {
    if (window.confirm("Are you sure?")) {
      dispatch(itemChecked(id));
      dispatch(deleteSelected(id));
    }
  }
  return (
    <div className={styles.mainContainer}>
      <div className={styles.headingRow}>
        <input type="checkbox" onClick={handleAllSelect} />
        <div>
          <b>Name</b>
        </div>
        <div>
          <b>Email</b>
        </div>
        <div>
          <b>Role</b>
        </div>
        <div>
          <b>Actions</b>
        </div>
      </div>
      {data.filteredData.map((el, index) => {
        return (
          isValidIndex(index) && (
            <Row
              key={el.id}
              el={el}
              styles={styles}
              handleCheck={handleCheck}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
            />
          )
        );
      })}
    </div>
  );
}

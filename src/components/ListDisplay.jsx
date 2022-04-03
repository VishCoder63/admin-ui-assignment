import { useDispatch, useSelector } from "react-redux";
import styles from "./css/listDisplay.module.css";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
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
    if(data.editableIds.includes(id))
      dispatch(endEdit(id))
    else 
      dispatch(startEdit(id))
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
        {console.log(data.currPage, data.allSelectPageNo)}
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
            <>
              <div key={el.id} className={styles.row}
                style={{ backgroundColor: `${data.selectedIds.includes(el.id) ? 'rgb(230, 230, 230)' : 'transparent'}` }}
              >
                {/* {console.log(data)} */}
                <input
                  type="checkbox"
                  onChange={(e) => handleCheck(e.target.checked, el.id)}
                  checked={data.selectedIds.includes(el.id) ? true : false}                  
                />
                <input className={styles.valuebox} value={el.name} disabled={data.editableIds.includes(el.id)?false:true}/>
                <input className={styles.valuebox} value={el.email} disabled={data.editableIds.includes(el.id)?false:true}/>
                <input className={styles.valuebox} value={el.role} disabled={data.editableIds.includes(el.id)?false:true}/>
                <div>
                  <button>
                    <BiEdit size={20} onClick={() => handleEditClick(el.id)} />
                  </button>
                  <button>
                    <RiDeleteBin7Line
                      size={20}
                      onClick={() => handleDeleteClick(el.id)}
                    />
                  </button>
                </div>
              </div>
            </>
          )
        );
      })}
    </div>
  );
}

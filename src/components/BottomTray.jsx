import { useDispatch, useSelector } from "react-redux";
import { maxRowsPerPage } from "../constants";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { BsChevronDoubleRight } from "react-icons/bs";
import styles from "./css/bottomTray.module.css";
import { deleteSelected, pageChanged } from "../Redux/Actions";
export function BottomTray() {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  function handleDoubleLeftClick() {
    // alert('ads')
    dispatch(pageChanged(1));
  }
  function handleLeftClick() {
    dispatch(pageChanged(data.currPage - 1));
  }
  function handleRightClick() {
    dispatch(pageChanged(data.currPage + 1));
  }
  function handleDoubleRightClick() {
    dispatch(pageChanged(numberOfPages));
  }
  function goToPage(index) {
    dispatch(pageChanged(index + 1));
  }
  function handleDeleteSelected() {
    // console.log(data.selectedIds)
    dispatch(deleteSelected());
  }
  const numberOfPages = Math.ceil(data.filteredData.length / maxRowsPerPage);
  const pageNumbersArray = new Array(numberOfPages).fill(1);
  return (
    <div className={styles.bottomTray}>
      <button className={styles.deleteSelected} onClick={handleDeleteSelected}>Delete Selected</button>
      <div className={styles.pageBlock}>
        <button
          disabled={data.currPage == 1 ? true : false}
          onClick={handleDoubleLeftClick}
        >
          <BsChevronDoubleLeft />
        </button>
        <button
          onClick={handleLeftClick}
          disabled={data.currPage == 1 ? true : false}
        >
          <BsChevronLeft />
        </button>
        {pageNumbersArray.map((el, index) => (
          <button
            onClick={() => goToPage(index)}
            style={{
              backgroundColor: `${
                index + 1 == data.currPage ? "transparent" : "#1890FF"
              }`,
              color: `${
                index + 1 == data.currPage ? "#1890FF" : "white"
              }`,
            }}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleRightClick}
          disabled={data.currPage == numberOfPages ? true : false}
        >
          <BsChevronRight />
        </button>
        <button
          onClick={handleDoubleRightClick}
          disabled={data.currPage == numberOfPages ? true : false}
        >
          <BsChevronDoubleRight />
        </button>
      </div>
    </div>
  );
}

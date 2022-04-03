import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import {useState} from 'react'

export function Row({el,styles,handleCheck,handleDeleteClick,handleEditClick}) {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  const [name,setName]=useState(el.name)
  const [role,setRole]=useState(el.role)
  const [email,setEmail]=useState(el.email)
 
  return <div
  key={el.id}
  className={styles.row}
  style={{
    backgroundColor: `${
      data.selectedIds.includes(el.id)
        ? "rgb(230, 230, 230)"
        : "transparent"
    }`,
  }}
>
  {/* {console.log(data)} */}
  <input
    type="checkbox"
    onChange={(e) => handleCheck(e.target.checked, el.id)}
    checked={data.selectedIds.includes(el.id) ? true : false}
  />
  <input
    className={styles.valuebox}
    disabled={data.editableIds.includes(el.id) ? false : true}
    // value={data.editableIds.includes(el.id)?'':el.name}
    value={name}
    onChange={(e) => setName(e.target.value)}
    style={{
      color: "red",
    }}
  />
  <input
    className={styles.valuebox}
    value={email}
      disabled={data.editableIds.includes(el.id) ? false : true}
      onChange={(e) => setEmail(e.target.value)}
  />
  <input
    className={styles.valuebox}
    value={role}
      disabled={data.editableIds.includes(el.id) ? false : true}
      onChange={(e) => setRole(e.target.value)}
  />
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
}

import { useDispatch } from "react-redux";
import { searching } from "../Redux/Actions";

export function Search() {
  const dispatch = useDispatch();
  function searchByTerm(term) {
    term = term.trim();
    dispatch(searching(term));
  }
  return (
    <div>
      <input
        style={{
          height: "1.5rem",
          width: "80%",
          margin: "1rem",
          border: "2px solid teal",
        }}
        type="text"
        placeholder="Search by name or role or email"
        onChange={(e) => searchByTerm(e.target.value)}
      />
    </div>
  );
}

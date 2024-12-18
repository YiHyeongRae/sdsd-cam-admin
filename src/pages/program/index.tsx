import { Navigate } from "react-router-dom";

function index() {
  return <Navigate to={"/program/list"} />;
}

export default index;

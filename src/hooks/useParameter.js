import { useLocation } from "react-router";

const useParameter = () => {
  return new URLSearchParams(useLocation().search);
}

export default useParameter
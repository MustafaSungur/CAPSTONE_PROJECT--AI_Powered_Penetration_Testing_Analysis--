import { jwtDecode } from "jwt-decode";

const jwt_Decode = (token) => {
  const decode = jwtDecode(token);
  return decode;
};

export default jwt_Decode;

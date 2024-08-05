import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkCookie } from "./app/features/auth/authSlice";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkCookie());
  }, []);
  return (
    <>
      {/* useRoutes ile routes dosyasındaki tanımlanan sayfaları görüntülemek için kullanılır */}
      {useRoutes(routes)}
    </>
  );
}

export default App;

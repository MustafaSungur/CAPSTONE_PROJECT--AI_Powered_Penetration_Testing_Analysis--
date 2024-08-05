import { Outlet } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/footer";

const HomeLayout = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen justify-between">
        <Outlet />
        <Footer className="mt-auto" />
      </div>
    </>
  );
};

export default HomeLayout;

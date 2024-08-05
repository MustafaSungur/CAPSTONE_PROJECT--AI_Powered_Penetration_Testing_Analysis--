// Login.js
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../app/features/auth/authActions";
import Spinner from "../../Components/Spinner";
import logo from "../../assets/logo.svg";
import { Button } from "@/Components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../../Components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import { Label } from "../../Components/ui/label";
import { Input } from "@/Components/ui/input";
import Cookies from "universal-cookie";

const cookie = new Cookies(null, { path: "/" });

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, userToken } = useSelector((state) => state.auth);
  // success durumu true olduğunda yönlendirme
  useEffect(() => {
    if (userToken) {
     cookie.set("token", userToken);
     navigate("/user/dashboard"); // Yönlendirilecek sayfanın URL'sini buraya ekleyin
    }
  }, [userToken, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // transform email string to lowercase to avoid case sensitivity issues in login
    formData.email = formData.email.toLowerCase();
    dispatch(loginUser(formData));
  };

  return (
    <section className="mt-32 ">
      <div className="flex flex-col  items-center  mx-auto md:h-screen lg:py-0">
        <Link
          to="/"
          className="flex items-center text-4xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-24 h-24  rounded-full " src={logo} alt="logo" />
          AlazSec
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {error && (
                <Alert>
                  <RocketIcon className="h-4 w-4" />
                  <AlertTitle>Error!</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="flex flex-col gap-1">
                <Label htmlFor="email" className="text-lg">
                  Your email
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  className="register-input"
                  onChange={handleChange}
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="password" className="text-lg">
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="register-input"
                  onChange={handleChange}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full text-lg"
              >
                {loading ? <Spinner /> : "Login"}
              </Button>
              <p className=" font-light text-gray-500 dark:text-gray-400 text-lg">
                Don’t have an account yet?{" "}
                <Link
                  to="/auth/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-lg"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

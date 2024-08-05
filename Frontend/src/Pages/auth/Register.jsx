import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "../../Components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import { registerUser } from "../../app/features/auth/authActions";
import Spinner from "../../Components/Spinner";
import { useEffect } from "react";
import logo from "../../assets/logo.svg";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success) {
      navigate("/auth/login");
    }
  }, [success, navigate]);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Password mismatch");
    } else {
      // transform email string to lowercase to avoid case sensitivity issues in login
      formData.email = formData.email.toLowerCase();

      // Oluşturulan formData'dan confirmPassword'u çıkar
      const { confirmPassword, ...formDataWithoutConfirmPassword } = formData;

      dispatch(registerUser(formDataWithoutConfirmPassword));
    }
  };

  return (
    <section className="mt-14 mb-24 ">
      <div className="flex flex-col  items-center   mx-auto md:h-screen lg:py-0 ">
        <Link
          to="/"
          className="flex items-center text-4xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-24 h-24  rounded-full" src={logo} alt="logo" />
          AlazSec
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-5 md:space-y-4 " onSubmit={handleSubmit}>
              {error && (
                <Alert>
                  <RocketIcon className="h-4 w-4" />
                  <AlertTitle>Error!</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="flex flex-col gap-1">
                <Label htmlFor="firstName" className="text-lg">
                  First Name
                </Label>
                <Input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="First Name"
                  className="register-input"
                  onChange={handleChange}
                  value={formData.firstname}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="firstName" className="text-lg">
                  Last Name
                </Label>
                <Input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Last Name"
                  className="register-input"
                  onChange={handleChange}
                  value={formData.lastname}
                  required
                />
              </div>
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
                  value={formData.email}
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
                  value={formData.password}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="confirm-password" className="text-lg">
                  Confirm password
                </Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="register-input"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <Input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <Label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </Label>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full text-lg"
                disabled={loading}
              >
                {loading ? <Spinner /> : "Create an account"}
              </Button>
              <p className="text-l font-light text-gray-500 dark:text-gray-400 text-lg">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-xl"
                >
                  Sign in here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

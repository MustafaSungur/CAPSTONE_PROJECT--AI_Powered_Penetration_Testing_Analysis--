import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startOsintAsync } from "@/app/features/osint/osintAction";
import AlertPopup from "../../Components/AlertPopup";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import { resetError } from "@/app/features/osint/osintSlice";
const Osint = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.osint);
  const [formdata, setFormdata] = useState({
    url: "",
    user: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formdata.url === "" || !userInfo._id) {
      alert("Please enter url");
      return;
    }
    formdata.user = userInfo._id;
    dispatch(startOsintAsync(formdata));
    dispatch(resetError());
    setFormdata({ url: "", user: null });
  };

  return (
    <>
      <AlertPopup />
      <section className="mt-36">
        <div className="flex flex-col items-center justify-top mx-auto md:h-screen lg:py-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
              OSINT - Open Source Intelligence
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {error && (
                <Alert>
                  <RocketIcon className="h-4 w-4" />
                  <AlertTitle>Error!</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div>
                <Label
                  htmlFor="url"
                  className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
                >
                  Enter URL for OSINT:
                </Label>
                <Input
                  className="p-5"
                  type="text"
                  name="url"
                  id="url"
                  value={formdata.url}
                  onChange={(e) => setFormdata({ url: e.target.value })}
                  placeholder="https://example.com"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full text-lg"
                disabled={loading}
              >
                {loading ? "Osint Starting..." : "Get OSINT"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Osint;

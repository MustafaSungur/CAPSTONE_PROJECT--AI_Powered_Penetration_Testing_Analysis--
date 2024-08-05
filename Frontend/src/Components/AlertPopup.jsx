import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alertDialog";
import { useDispatch, useSelector } from "react-redux";
import { resetResponse } from "@/app/features/osint/osintSlice";
import { useNavigate } from "react-router-dom";

export default function AlertPopup() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { response } = useSelector((state) => state.osint);
  const [open, setOpen] = useState(!!response);
  useEffect(() => {
    if (response) {
      handleOpen();
    }
  }, [response]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(resetResponse());
    navigate("/user/dashboard");
  };

  return (
    <>
      {response && (
        <AlertDialog open={open} onClose={handleOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Osint Started</AlertDialogTitle>
              <AlertDialogDescription>
                {response.message}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleClose}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}

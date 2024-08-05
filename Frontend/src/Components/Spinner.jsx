import Lottie from "react-lottie";
import animationData from "../assets/loading.json"; // JSON dosyanızın yolunu ekleyin

const Spinner = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex items-center justify-center">
      <Lottie options={defaultOptions} height={100} width={100} />
    </div>
  );
};

export default Spinner;

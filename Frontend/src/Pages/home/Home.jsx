import { motion } from "framer-motion";
import homePng from "../../assets/home.png";
import { Link } from "react-router-dom";
import banner1 from "../../assets/banner1.png";
import nmap from "../../assets/nmap.svg";
import nuklei from "../../assets/atom.png";
import nikto from "../../assets/nikto.jpeg";
const Home = () => {
  return (
    <>
      {/* HEADER */}
      <header className="w-4/5 mx-auto h-screen flex">
        <motion.div className="flex-1 flex flex-col justify-center mb-52">
          <h1 className="p-5 text-6xl">AI-assisted OSINT</h1>
          <p className="px-5 text-xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error,
            dolorem. Omnis dignissimos possimus ea odio odit nobis deleniti
            voluptatem quam, beatae asperiores maxime labore tempora aliquam eos
            saepe. Laudantium, recus andae!
          </p>
          <div className="p-5 mt-4 ">
            <Link
              to="/user/osint"
              className="text-xl px-14 py-2  bg-blue-600 text-white rounded-2xl hover:bg-blue-500 transition"
            >
              Try Now
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="w-4/5 flex-1 my-auto"
          animate={{ y: [0, -10, 10, -10, 10, 0] }}
          transition={{ repeat: Infinity, duration: 13 }}
        >
          <img src={homePng} alt="homePng" className="w-full mb-48" />
        </motion.div>
      </header>

      {/* ABOUT */}
      <section className="w-4/5 mx-auto h-1/2 flex  px-10 gap-3  border-y">
        <div className="flex flex-col flex-1 mt-44 gap-3">
          <h2 className="text-3xl ">What is the AlazSec</h2>
          <p className="text-xl">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet
            assumenda explicabo dolore. Sapiente, animi aliquam voluptatibus ea
            mollitia ipsam, vero harum hic voluptas debitis doloremque veritatis
            iste, maiores in earum?
          </p>
        </div>
        <div className="w-4/5 flex-1">
          <img src={banner1} alt="banner1" />
        </div>
      </section>

      {/* TOOLS */}
      <section className="flex flex-col w-4/5 mx-auto gap-3 px-10 mt-5 mb-16">
        <h3 className="text-3xl ">Used Tools For Osint</h3>
        <div className="flex  justify-between w-full mx-auto">
          <div className="w-24 h-24 flex flex-col  text-center text-2xl font-bold gap-2">
            <img src={nmap} alt="nmap" className="w-full  " />
            <span>Nmap</span>
          </div>
          <div className="w-24 h-24 flex flex-col  text-center text-2xl font-bold gap-3">
            <img src={nuklei} alt="nuklei" className="w-full  " />
            <span>Nuklei</span>
          </div>
          <div className="w-32  h-32 flex flex-col  text-center text-2xl font-bold gap-2">
            <img src={nikto} alt="nikto" className="w-full  " />
            <span>Nikto</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

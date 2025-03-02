// // components/Layout.js
// import { motion, AnimatePresence } from "framer-motion";
// import { useRouter } from "next/router";
// import Navbar from "./Navbar";
// import { navigationMenu } from "./data/navMenuList";
import Head from "next/head";

const Layout = ({ children }) => {
//  const router = useRouter();
  return (
    <>
      <Head>
        <title>∫ntegral</title>
      </Head>
      {children}
      {/* <AnimatePresence mode="wait"> */}
        {/* {router.asPath.includes("loading") ? (
          ""
        ) : (
          <Navbar navigationMenu={navigationMenu} />
        )} */}
        {/* <motion.div
          key={router.pathname} // Key ensures each page has a unique transition
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
        >
 
        </motion.div> */}
      {/* </AnimatePresence> */}
    </>
  );
};

export default Layout;

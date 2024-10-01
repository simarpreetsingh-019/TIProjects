import React from "react";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";
import toast, { Toaster } from "react-hot-toast";
import { StateContextProvider } from "../context";
import { useRouter } from "next/router";
import "../styles/globals.css";
import { Web3Provider } from '../utils/providers/Web3Provider';

// Optionally, you can set test mode or configure artifacts
const useTestAadhaar = true; // Change to false if using real Aadhaar

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <Web3Provider>
      <AnonAadhaarProvider _useTestAadhaar={useTestAadhaar}>
        <StateContextProvider>
          <Component {...pageProps} />
          <Toaster />
        </StateContextProvider>

        {/* Include necessary scripts only */}
        <script src="/js/vendor/jquery.js"></script>
        <script src="/js/vendor/jquery.nice-select.min.js"></script>
        <script src="/js/vendor/jquery-ui.js"></script>
        <script src="/js/vendor/modernizer.min.js"></script>
        <script src="/js/vendor/feather.min.js"></script>
        <script src="/js/vendor/slick.min.js"></script>
        <script src="/js/vendor/bootstrap.min.js"></script>
        <script src="/js/vendor/sal.min.js"></script>
        <script src="/js/vendor/particles.js"></script>
        <script src="/js/vendor/jquery.style.swicher.js"></script>
        <script src="/js/vendor/js.cookie.js"></script>
        <script src="/js/vendor/count-down.js"></script>
        <script src="/js/vendor/isotop.js"></script>
        <script src="/js/vendor/imageloaded.js"></script>
        {/* <script src="/js/vendor/backtoTop.js"></script> */}
        <script src="/js/vendor/odometer.js"></script>
        <script src="/js/vendor/jquery-appear.js"></script>
        <script src="/js/vendor/scrolltrigger.js"></script>
        <script src="/js/vendor/jquery.custom-file-input.js"></script>
        <script src="/js/vendor/savePopup.js"></script>
        <script src="/js/vendor/vanilla.tilt.js"></script>
        <script src="/js/main.js"></script>
        {/* Remove or add scripts as needed */}
        {/* <script src="/js/vendor/web3.min.js"></script>
        <script src="/js/vendor/maralis.js"></script>
        <script src="/js/vendor/nft.js"></script> */}
      </AnonAadhaarProvider>
    </Web3Provider>
  );
}

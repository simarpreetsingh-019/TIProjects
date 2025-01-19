import axios from "axios";
// import { Buffer } from "buffer";

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const hex2buf = (hex: any) => {
//     return new Uint8Array(
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       hex.match(/[\da-f]{2}/gi).map((h: any) => parseInt(h, 16))
//     );
//   };

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   function bytes2Char(hex: any) {
//     return Buffer.from(hex2buf(hex)).toString("utf8");
//   }


const fetchnft = async () => {
    try {
      const response = await axios.get(
        `https://api.ghostnet.tzkt.io/v1/contracts/KT1MJEryRHS1vsz9swmP8k6ifU4ZM8Z46PcQ/bigmaps/data/keys`
      );
      
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

export default fetchnft;
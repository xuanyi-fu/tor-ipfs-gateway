import axios from "axios"
import { torRequestIP, torIPFSGetWithCID } from "../torGateway"
import { IP_API_URL } from "../utils"

// just a string
const HELLO_WORLD_CID = "QmYAXgX8ARiriupMQsbGXtKdDyGzWry1YV3sycKw1qqmgH";
const HELLO_WORLD_CONTENT = "Hello, World!\n";

// ~200KB pdf
const BTC_WHITEBOOK_PDF_CID = "QmRA3NWM82ZGynMbYzAgYTSXCVM14Wx1RZ8fKP42G6gjgj";

// ~27MB pdf
const PDF_20MB_CID = "QmUMJYTy7QEdQcMwzK28qNopndVpk9NXY1aaVt2JY3zoui";

describe('Tor Connection Test', () => {
  it('IP should be different from real ip', async () => {
    const realIP = await axios.get(IP_API_URL);
    const torIP = await torRequestIP();
    expect(realIP.data === torIP.data).toBeFalsy();
  })
})
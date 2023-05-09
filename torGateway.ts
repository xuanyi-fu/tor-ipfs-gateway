import { SocksProxyAgent } from 'socks-proxy-agent';
import axios from 'axios';
import { IP_API_URL } from './utils';

const TOR_IP = "127.0.0.1";
const TOR_DEFAULT_PORT = "9050";
let TOR_PORT = TOR_DEFAULT_PORT;
let TOR_AGENT : SocksProxyAgent | null = null; 
const DEFAULT_IPFS_GATEWAY = "https://ipfs.io";
let IPFS_GATEWAY = DEFAULT_IPFS_GATEWAY;

function getIPFSGatewayUrl(cid : string) {
  return `${IPFS_GATEWAY}/ipfs/${cid}`
}

function createTorAgent(port?: string) {
  return new SocksProxyAgent(`socks5://${TOR_IP}:${port}`);
}

function ensureTorAgent(port?: string) {
  if(port === undefined) {
    port = TOR_DEFAULT_PORT;
  }
  if(TOR_AGENT === null || port !== TOR_PORT) {
    TOR_AGENT = createTorAgent(port);
  }
}

async function torRequestIP(port?: string) {
  ensureTorAgent(port);
  const result = await axios.get(IP_API_URL, {
    httpsAgent: TOR_AGENT,
  })
  return result.data;
} 

async function torIPFSGetWithCID(cid : string, port?: string) {
  ensureTorAgent(port);
  const url = getIPFSGatewayUrl(cid);
  const result = await axios.get(url, {
    responseType: 'stream',
    httpsAgent: TOR_AGENT,
  });
  return result;
}

export { torRequestIP, torIPFSGetWithCID};
import axios from "axios";
import { ethers, Wallet } from "ethers";
import { UsernameUpdatePayload } from "./model";

const pk = process.env.PK || "";
const wallet = new ethers.Wallet(pk);

function createUsernameUpdatePayload(address: string, ts: number, name: string) : UsernameUpdatePayload {
    const domain = {
        name: 'UsernameUpdate',
        version: '1',
        chainId: 137,
      };
  
      const types = {
          "UsernameUpdate": [
              { name: "address", type: "address" },
              { name: "timestamp", type: "uint256"},
              { name: "name", type: "string" },
          ],
      };
      const values = {
        "address": address,
        "timestamp": ts,
        "name": name,
    };

    return {
        domain: domain,
        types: types,
        values: values,
    }
} 

/**
 * Signs the username update payload with the wallet
 * @param wallet 
 * @param payload 
 * @returns 
 */
async function sign(wallet: Wallet, payload: UsernameUpdatePayload) : Promise<string> {
    const sig = await wallet._signTypedData(payload.domain, payload.types, payload.values);
    return sig;
}

async function sendToApi(url: string, address: string, ts: number, name: string, sig: string) {
    const payload = {
        "address": address,
        "name": name,
        "timestamp": ts,
        "signature": sig,
    }
    console.log(payload);
    return axios.post(url, payload);
}

async function main() {
    console.log(`Started...`);
    const url = process.env.URL || "";

    const address = await wallet.getAddress();
    const name = "john-smith";
    const timestamp = Date.now();
    const signature = await sign(wallet, createUsernameUpdatePayload(address, timestamp, name));

    const resp = await sendToApi(url, address, timestamp, name, signature);
    console.log(`Response: ${resp.status}`);

    console.log(`Done!`);
}


main();
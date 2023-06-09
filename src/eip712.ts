import { Wallet } from "ethers";
import { UsernameUpdatePayload } from "./model";

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


export async function createAndSignUsernamePayload(wallet: Wallet, address: string, ts: number, name: string): Promise<string> {
    console.log(`Creating and signing Payload{address=${address}, timestamp=${ts.toString()}, name=${name}}`);

    return sign(wallet, createUsernameUpdatePayload(address, ts, name));
}

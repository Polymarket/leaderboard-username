import { resolve } from "path";
import * as yargs from "yargs";
import { ethers } from "ethers";
import { config as dotenvConfig } from "dotenv";

import { createAndSignUsernamePayload } from "./eip712";
import { post } from "./post";

dotenvConfig({ path: resolve(__dirname, "../.env") });

const args = yargs.options({
    name: { type: "string", demandOption: true, default: "john-smith" },
}).argv;


const pk = process.env.PK || "";
const wallet = new ethers.Wallet(pk);

async function main(args: any) {
    console.log(`Started...`);
    const url = process.env.URL || "";

    const address = await wallet.getAddress();
    const name = args.name;
    const timestamp = Math.floor(Date.now() / 1000);
    
    const signature = await createAndSignUsernamePayload(wallet, address, timestamp, name);
    const resp = await post(url, address, timestamp, name, signature);
    
    console.log(`Response: ${resp.status}`);
    console.log(`Done!`);
}


main(args);
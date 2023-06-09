import axios from "axios";

export async function post(url: string, address: string, ts: number, name: string, sig: string) {
    console.log(`Sending username update payload to API...`);
    const payload = {
        "address": address,
        "name": name,
        "timestamp": ts,
        "signature": sig,
    }
    console.log(payload);
    return axios.post(url, payload);
}
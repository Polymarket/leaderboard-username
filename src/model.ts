interface Domain {
    name: string;
    version: string;
    chainId: number;
}


export interface UsernameUpdatePayload {
    domain: Domain;
    types: any;
    values: any
}
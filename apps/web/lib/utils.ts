import { randomBytes } from "node:crypto"

export { cn } from "cn"

const  generateEndpointToken = (prefix: string, ByteSize: number) : string => {
    const token = randomBytes(ByteSize).toString('base64');
    return `${prefix}${token}`
}

export {generateEndpointToken}
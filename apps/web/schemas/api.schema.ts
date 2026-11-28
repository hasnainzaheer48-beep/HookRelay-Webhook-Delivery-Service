import {z} from '@hookrelay/shared'

export const APIschema = z.object({
    name: z.string().min(1, "API must be given a name").max(30, "API name too long")
})

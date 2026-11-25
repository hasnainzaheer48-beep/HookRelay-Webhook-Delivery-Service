import {z} from '@hookrelay/shared'

const typeNameRegex = /^[a-z0-9._]+$/;
export const endpointSchema = z.object({
    description: z.string(),
   
    url: z.url().refine(
        (val) => { 
            if(process.env.NODE_ENV === 'production'){
                return new URL(val).protocol === "https:"
            }
            return true
        }),
    eventTypes: z.string().transform(
        (val) => val.split(",").map(
            (itm) => itm.trim()
        ).filter(Boolean)).pipe(
            z.array(z.string().regex(typeNameRegex,  'Only lowercase letters, numbers, dots, and underscores are allowed'))
        ),
    rateLimitPerSec: z.coerce.number().int().min(1, 'Rate Limit must be at least 1').max(100, 'Rate Limit is 100 at max')
    //Add a default value 10 in form input 
})

export const endpointStatusSchema = z.enum(["active", "paused"])

export const endpointIdSchema = z.uuid()
import Joi from 'joi';

/**
 * Validate and parse data with schema,
 * throws if validation fails
 */
export const validate = <T>(schema: Joi.ObjectSchema<T>, data: T | any): T => {
    const { error, value } = schema.validate(
            data, 
            {
                abortEarly: true,
                convert: true,
                stripUnknown: true,
            }
        )
    if(error) {
        throw error
    }
    if(!value) {
        throw new Joi.ValidationError('got empty value', [], data)
    }
    return value
}
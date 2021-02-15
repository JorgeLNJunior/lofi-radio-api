import Joi from 'joi';

export interface BaseValidator {
  validate(body: unknown): Joi.ValidationResult;
}

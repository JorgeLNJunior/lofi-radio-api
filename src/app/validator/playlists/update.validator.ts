import Joi, { ValidationResult } from 'joi';

import { PlaylistUpdateBody } from '../../../@types/body';
import { BaseValidator } from '../../../@types/validator';

export class UpdatePlaylistValidator implements BaseValidator {
  validate(body: PlaylistUpdateBody): ValidationResult {
    const schema = Joi.object({
      title: Joi.string().min(3).max(70).optional(),
      originalUrl: Joi.string().optional(),
    });

    return schema.validate(body, { stripUnknown: true });
  }
}

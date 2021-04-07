import Joi from 'joi';
import { BaseValidator } from 'src/@types/validator';

import { SongUpdateBody } from '../../../@types/body';

export class UpdateSongValidator implements BaseValidator {
  validate(body: SongUpdateBody): Joi.ValidationResult {
    const schema = Joi.object({
      title: Joi.string().optional(),
    });

    return schema.validate(body, { stripUnknown: true });
  }
}

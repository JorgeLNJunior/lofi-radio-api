import Joi from 'joi';
import { BaseValidator } from 'src/@types/validator';

import { SongBody } from '../../../@types/body';

export class CreateSongValidator implements BaseValidator {
  validate(body: SongBody): Joi.ValidationResult {
    const schema = Joi.object({
      title: Joi.string().required(),
      artistsUuids: Joi.array()
        .required()
        .min(1)
        .items(Joi.string().required()),
    });

    return schema.validate(body, { stripUnknown: true });
  }
}

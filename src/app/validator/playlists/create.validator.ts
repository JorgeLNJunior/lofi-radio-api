import Joi, { ValidationResult } from 'joi';
import { PlaylistBody } from 'src/@types/body';
import { BaseValidator } from 'src/@types/validator';

export class CreatePlaylistValidator implements BaseValidator {
  validate(body: PlaylistBody): ValidationResult {
    const schema = Joi.object({
      title: Joi.string().min(3).max(70).required(),
      originalUrl: Joi.string().optional(),
      songsUuids: Joi.array().min(1).items(Joi.string().required()).required(),
    });

    return schema.validate(body, { stripUnknown: true });
  }
}

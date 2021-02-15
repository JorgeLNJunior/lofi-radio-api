import Joi from 'joi';

import { ArtistBody } from '../../../@types/body';
import { BaseValidator } from '../../../@types/validator';

export class CreateArtistValidator implements BaseValidator {
  validate(body: ArtistBody): Joi.ValidationResult {
    const schema = Joi.object({
      name: Joi.string().required(),
      spotifyUrl: Joi.string()
        .optional()
        .regex(/^https?:\/\/(www.)?open.spotify\.com\/artist\//)
        .messages({
          'string.pattern.base': '"spotifyUrl" must be a valid spotify url',
        }),
      youtubeUrl: Joi.string()
        .optional()
        .regex(/^https?:\/\/(www.)?youtube\.com\/channel\//)
        .messages({
          'string.pattern.base':
            '"youtubeUrl" must be a valid youtube channel url',
        }),
      soundcloudUrl: Joi.string()
        .optional()
        .regex(/^https?:\/\/(www.)?soundcloud\.com\//)
        .messages({
          'string.pattern.base':
            '"soundcloudUrl" must be a valid soundcloudUrl url',
        }),
    });

    return schema.validate(body, { stripUnknown: true });
  }
}

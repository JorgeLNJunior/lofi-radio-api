import Joi from 'joi';

import { ArtistBody } from '../../../@types/body';
import { BaseValidator } from '../../../@types/validator';
import { soundcloudRegex, spotifyRegex, youtubeRegex } from './regex';

export class CreateArtistValidator implements BaseValidator {
  validate(body: ArtistBody): Joi.ValidationResult {
    const schema = Joi.object({
      name: Joi.string().required(),
      spotifyUrl: Joi.string().optional().regex(spotifyRegex).messages({
        'string.pattern.base': '"spotifyUrl" must be a valid spotify url',
      }),
      youtubeUrl: Joi.string().optional().regex(youtubeRegex).messages({
        'string.pattern.base':
          '"youtubeUrl" must be a valid youtube channel url',
      }),
      soundcloudUrl: Joi.string().optional().regex(soundcloudRegex).messages({
        'string.pattern.base':
          '"soundcloudUrl" must be a valid soundcloudUrl url',
      }),
    });

    return schema.validate(body, { stripUnknown: true });
  }
}

import { Model } from 'mongoose';
import { slugify } from './slugify';
import { v4 as uuidv4 } from 'uuid';

export const generateSlug = async <T extends { slug: string }>(
  Model: Model<T>,
  name: string
): Promise<string> => {
  let slug = slugify(name);

  const existingSlug = await Model.findOne({ slug });
  if (existingSlug) {
    slug = `${slug}-${uuidv4()}`;
  }
  return slug;
};

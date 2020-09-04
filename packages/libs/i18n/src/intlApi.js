import { en } from '../../../../config/lang';

const lang = {
  'en-US': en,
};

const getLangFile = langCode => lang[langCode];
const tmp = () => '';

export { getLangFile, tmp };

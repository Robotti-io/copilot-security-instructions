import fs from 'fs';
import path from 'path';

const prompts = {};

fs.readdirSync(path.join(process.cwd(), 'prompts')).forEach(file => {
  prompts[file] = fs.readFileSync(path.join(process.cwd(), 'prompts', file), 'utf-8');
});

export {
  prompts,
};

export default {
  prompts,
};

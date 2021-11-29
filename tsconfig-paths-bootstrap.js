/* eslint-disable prettier/prettier */

import { compilerOptions } from './tsconfig.json';
import { register } from 'tsconfig-paths';

const baseUrl = './dist'; // Either absolute or relative path. If relative it's resolved to current working directory.
register({
  baseUrl,
  paths: compilerOptions.paths,
});

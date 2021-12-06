import { registerAs } from '@nestjs/config';
import config from './confg.json';
export default registerAs('firebase-admin', () => config);

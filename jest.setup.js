import { setConfig } from 'next/config';
import publicRuntimeConfig from './next.config';

setConfig({ publicRuntimeConfig });

// jest.mock('next/config', () => () => ({ publicRuntimeConfig: { PORT: 3000 } }));

import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { BASE_URL } = publicRuntimeConfig;

export { BASE_URL };

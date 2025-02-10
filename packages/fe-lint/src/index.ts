import type { InitOptions, ScanOptions } from './types';

type IInitOptions = Omit<InitOptions, 'checkVersionUpdate'>;

export const init = async (options: IInitOptions) => {
  return await initAction({
    ...options,
    checkVersionUpdate: false,
  });
};
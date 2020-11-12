import { url, commonFetch } from './utils';

export const getDateList = async () => {
  return commonFetch(`${url}/get-dates`, { method: 'GET' });
};

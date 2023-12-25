import data from './assets/files_API.json';

export const getFakeData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = data;
      resolve(result);
    }, 1200);
  });
};
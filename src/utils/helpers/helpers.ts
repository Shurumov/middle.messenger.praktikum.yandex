import { registerHelper } from 'handlebars';

registerHelper('numToTime', (num: number) => {
  if (typeof num === 'undefined') {
    return '';
  }
  const date = new Date(num);
  return `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
});

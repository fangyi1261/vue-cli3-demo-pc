import Vue from 'vue';
import formatDate from '../utils/date';

Vue.filter('date-format', (date, format = 'yyyy-MM-dd') => {
  if (!date) {
    return date;
  } else {
    return formatDate(new Date(date), format);
  }
});

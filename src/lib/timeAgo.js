import parseISO from 'date-fns/parseISO';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import arLocale from 'date-fns/locale/ar';

const timeAgo = (timestamp) => {
  const date = parseISO(timestamp);
  const timePeriod = formatDistanceToNow(date, { locale: arLocale });
  return `منذ ${timePeriod}`;
};

export default timeAgo;

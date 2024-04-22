import { parseISO, formatDistanceToNow } from 'date-fns';
import arLocale from 'date-fns/locale/ar';

const timeAgo = (timestamp) => {
  const date = parseISO(timestamp);
  const timePeriod = formatDistanceToNow(date, { locale: arLocale });
  return `منذ ${timePeriod}`;
};

export default timeAgo;

export const formatDistance = (distance: number): string => {
  if (distance < 1000) {
    return `${Math.round(distance)}m`;
  }
  return `${(distance / 1000).toFixed(1)}km`;
};

export const formatMemberCount = (count: number): string => {
  if (count < 1000) {
    return count.toString();
  }
  if (count < 1000000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return `${(count / 1000000).toFixed(1)}M`;
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

export const formatEventTime = (startDate: Date, endDate?: Date): string => {
  const start = formatTime(startDate);
  if (!endDate) return start;
  
  const end = formatTime(endDate);
  const isSameDay = startDate.toDateString() === endDate.toDateString();
  
  if (isSameDay) {
    return `${start} - ${end}`;
  }
  
  return `${formatDate(startDate)} ${start} - ${formatDate(endDate)} ${end}`;
};

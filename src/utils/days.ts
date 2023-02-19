import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

const plugins = [utc, timezone, localizedFormat, relativeTime];
plugins.forEach((plugin) => dayjs.extend(plugin));

type Timezone = {
  label: string;
  tzCode: string;
  name: string;
  utc: string;
};
interface Days {
  (...params: Parameters<typeof dayjs>): ReturnType<typeof dayjs>;

  // plugin
  utc: typeof dayjs.utc;

  // property
  extend: typeof dayjs.extend;
  locale: typeof dayjs.locale;
  isDayjs: typeof dayjs.isDayjs;
  unix: typeof dayjs.unix;

  tzNames(): Timezone[];
}

export const days = function (...params) {
  return dayjs(...params).tz('Asia/Seoul');
} as Days;

days.prototype = dayjs.prototype;

Object.assign(days, dayjs);

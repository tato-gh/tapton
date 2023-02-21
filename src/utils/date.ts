// YYYY-mm-dd HH:MM 表記用
export const cutSec = (time: string) => {
  const date = new Date(time);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};

// 今日の日付を返す
export const getToday = (): Date => ( new Date() );

// 昨日の日付を返す
export const getYesterday = (): Date => ( addDate(getToday(), -1) );

// 日付の開始時刻(00:00)を返す
export const getStartOfDate = (date: Date): Date => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0
  );
};

// 日付の終了時刻(23:59)を返す
export const getEndOfDate = (date: Date): Date => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59
  );
};

// 本日かどうかの判定
export const getIsToday = (date: Date): boolean => {
  const today = new Date();

  return today.getFullYear() == date.getFullYear() &&
    today.getMonth() == date.getMonth() &&
    today.getDate() == date.getDate();
};

// 基準日に指定日数を加減したDateを返す
export const addDate = (date: Date, offset: number): Date => {
  return new Date(date.getTime() + offset * 24 * 60 * 60 * 1000);
};

// 基準日に指定分を加減したDateを返す
export const addMinute = (date: Date, offset: number): Date => {
  return new Date(date.getTime() + offset * 60 * 1000);
};

// 基準日の次の指定曜日のDateを返す
export const getNextDayDate = (baseDate: Date, day: number): Date => {
  const currentDay = baseDate.getDay();
  let daysUntilNextday = day - currentDay;
  daysUntilNextday = (daysUntilNextday < 0) ? (daysUntilNextday + 7) : daysUntilNextday;

  return addDate(baseDate, daysUntilNextday);
};

// 基準日の次の日付のDateを返す
export const getNextDateDate = (baseDate: Date, date: number): Date => {
  const currentDate = baseDate.getDate();
  let daysUntilNextdate = date - currentDate;

  if(daysUntilNextdate >= 0){
    // 当月日付になるケース
    const nextDateCandidated = addDate(baseDate, daysUntilNextdate);
    return cutOverMonthDate(baseDate, nextDateCandidated);
  }else{
    // 翌月日付になるケース ~ 翌月初めを基準にして再呼び出し
    const currentMonth = baseDate.getMonth();
    const currentFullYear = baseDate.getFullYear();
    const nextMonth = currentMonth == 11 ? 0 : currentMonth + 1;
    const nextYear = nextMonth == 0 ? currentFullYear + 1 : currentFullYear;
    return getNextDateDate(new Date(nextYear, nextMonth, 1), date);
  }
};

// 月末補正をした結果を返す
// 計算などで日付変更した結果が月末を超えているときの補正用途
export const cutOverMonthDate = (cDate: Date, nDate: Date) => {
  if(cDate.getMonth() == nDate.getMonth()) {
    return nDate;
  } else {
    return addDate(nDate, -1 * nDate.getDate());
  }
};

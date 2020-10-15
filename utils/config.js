const api_url = 'https://www.tongjiyuxie.club/tjyx_backend/web/index.php';
const day_time = 24 * 60 * 60 * 1000;
const teach_name = "教学场";
const act_name = "自由活动场";
const no_sign = "未报名";
const signed = "已报名";
const location = "同济大学嘉定校区体育中心二楼";
const teach_weekday = 2;
const act_weekday = 2;
const teach_time = '15:20-17:20';
const act_time = '17:30-20:00';
const teach_num = 3;
const act_num = 1;
const teach_sign_start_weekday = 1;
const act_sign_start_weekday = 1;
const teach_sign_time = '15:00:00';
const act_sign_time = '15:00:00';

module.exports = {
  api_url: api_url,
  day_time: day_time,
  teach_weekday: teach_weekday,
  act_weekday: act_weekday,
  teach_time: teach_time,
  act_time: act_time,
  teach_sign_start_weekday: teach_sign_start_weekday,
  act_sign_start_weekday: act_sign_start_weekday,
  teach_sign_time: teach_sign_time,
  act_sign_time: act_sign_time,
  teach_name: teach_name,
  act_name: act_name,
  no_sign: no_sign,
  signed: signed,
  location: location,
  teach_num: teach_num,
  act_num: act_num
}
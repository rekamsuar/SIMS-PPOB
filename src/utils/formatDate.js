import moment from "moment";
export function formatDefaultDate(date) {
  if (date) {
    return moment(date, "YYYY-MM-DD HH:mm:ss").format("DD MMM YYYY");
  }
  return "";
}
export function formatCustomDate(date, customFirst, customLast) {
  if (date) {
    return moment(date, `${customFirst}`).format(`${customLast}`);
  }
  return "";
}

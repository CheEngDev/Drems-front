import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = pageNumber * pageSize;
  return _.chain(items).slice(startIndex).take(pageSize).value();
}

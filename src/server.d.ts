export interface Exception {
  getCode: () => number;
  getMessage: () => string;
  getObject: () => string;
}

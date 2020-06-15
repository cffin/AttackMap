import axios from "axios";
const kbn_version = "7.6.1"
axios.defaults.headers["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.headers["kbn-version"] = kbn_version;

//Response
axios.interceptors.response.use(response => {
  return Promise.resolve(response.data);
}, err => {
  if (axios.isCancel(err)) {
    return new Promise(() => { });
  }
  return Promise.reject(
    err
  );
})
export function GET(url, data, options) {
  return axios.get(url, data, options);
}
export function POST(url, data, options) {
  return axios.post(url, data, options);
}
export function PUT(url, data, options) {
  return axios.put(url, data, options);
}
export function DELETE(url, data, options) {
  return axios.delete(url, data, options);
}

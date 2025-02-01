// 함수 자체는 일반 함수인데 리턴값만 Promise인 경우
export function okPromise() {
  return Promise.resolve("ok");
}
export function noPromise() {
  return Promise.reject("no");
}

// 함수 자체가 async 함수인 경우
export async function okAsync() {
  return "ok";
}
export async function noAsync() {
  throw "no";
}

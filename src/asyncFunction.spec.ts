import { okPromise, okAsync, noPromise, noAsync } from "./asyncFunction";

test("okPromise 테스트(resolves 활용)", () => {
  const okSpy = jest.fn(okPromise);
  // 꼭 return을 해야 프로미스가 resolve 될 때까지 기다리고나서 테스트가 판단됨
  // return을 붙이지 않는다면 resolve되기 전에 테스트가 끝나버려서 passed든 failed든 다 passed로 뜸
  return expect(okSpy()).resolves.toBe("ok");
});

test("okPromise 테스트(then 활용)", () => {
  const okSpy = jest.fn(okPromise);
  // 꼭 return을 해야 프로미스가 resolve 될 때까지 기다리고나서 테스트가 판단됨
  return okSpy().then((result) => expect(result).toBe("ok"));
});

test("okPromise 테스트(async await 활용)", async () => {
  const okSpy = jest.fn(okPromise);
  const result = await okSpy();
  expect(result).toBe("ok");
});

test("noPromise 테스트(rejects 활용)", () => {
  const noSpy = jest.fn(noPromise);
  return expect(noSpy()).rejects.toBe("no");
});

test("noPromise 테스트(catch 활용)", () => {
  const noSpy = jest.fn(noPromise);
  return noSpy().catch((result) => expect(result).toBe("no"));
});

test("noPromise 테스트(catch 활용)", async () => {
  const noSpy = jest.fn(noPromise);
  try {
    await noSpy();
  } catch (err) {
    expect(err).toBe("no");
  }
});

test("okAsync 테스트(resolves 활용)", () => {
  const okSpy = jest.fn(okAsync);
  // 꼭 return을 해야 프로미스가 resolve 될 때까지 기다리고나서 테스트가 판단됨
  // return을 붙이지 않는다면 resolve되기 전에 테스트가 끝나버려서 passed든 failed든 다 passed로 뜸
  return expect(okSpy()).resolves.toBe("ok");
});

test("okAsync 테스트(then 활용)", () => {
  const okSpy = jest.fn(okAsync);
  // 꼭 return을 해야 프로미스가 resolve 될 때까지 기다리고나서 테스트가 판단됨
  return okSpy().then((result) => expect(result).toBe("ok"));
});

test("okAsync 테스트(async await 활용)", async () => {
  const okSpy = jest.fn(okAsync);
  const result = await okSpy();
  expect(result).toBe("ok");
});

test("noAsync 테스트(rejects 활용)", () => {
  const noSpy = jest.fn(noAsync);
  return expect(noSpy()).rejects.toBe("no");
});

test("noAsync 테스트(catch 활용)", () => {
  const noSpy = jest.fn(noAsync);
  return noSpy().catch((result) => expect(result).toBe("no"));
});

test("noAsync 테스트(catch 활용)", async () => {
  const noSpy = jest.fn(noAsync);
  try {
    await noSpy();
  } catch (err) {
    expect(err).toBe("no");
  }
});

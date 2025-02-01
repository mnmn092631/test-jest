import * as fns from "./asyncFunction";

test("okPromise 테스트(resolves 활용)", () => {
  // 두개가 동일함
  jest.spyOn(fns, "okPromise").mockReturnValue(Promise.resolve("ok"));
  jest.spyOn(fns, "okPromise").mockResolvedValue("ok");
  return expect(fns.okPromise()).resolves.toBe("ok");
});

test("noPromise 테스트(rejects 활용)", () => {
  // 두개가 동일함
  jest.spyOn(fns, "noPromise").mockReturnValue(Promise.reject("no"));
  jest.spyOn(fns, "noPromise").mockRejectedValue(Promise.reject("no"));
  return expect(fns.noPromise()).rejects.toBe("no");
});

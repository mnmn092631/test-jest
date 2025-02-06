beforeEach(() => {
  jest.resetModules();
});

it("first import", async () => {
  const c = await import("./mockClass"); // dynamic import
  // 클래스에 임의로 prop이라는 속성에 hello라는 값을 넣음
  (c as any).prop = "hello";
  expect(c).toBeDefined();
});

it.only("second import", async () => {
  const c = await import("./mockClass");
  // first import에서의 prop = hello가 유지가 되어서 passed가 됨
  expect((c as any).prop).toBe("hello");
});

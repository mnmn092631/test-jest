import { first, second, third } from "./order";

test("first -> second -> third", () => {
  const spy1 = jest.fn(first);
  const spy2 = jest.fn(second);
  const spy3 = jest.fn(third);
  spy1();
  spy2();
  spy3();
  // spy.mock에는 함수가 호출된 것에 대한 정보가 객체로 담겨져 있음
  // spy.mock.invocationCallOrder에는 호출 순서가 배열로 담겨져 있음
  // spy.mock.calls에는 인수가 2차원 배열로 들어있음
  console.log(spy1.mock.invocationCallOrder[0]);
  console.log(spy2.mock.invocationCallOrder[0]);
  console.log(spy3.mock.invocationCallOrder[0]);
  expect(spy1.mock.invocationCallOrder[0]).toBeLessThan(
    spy2.mock.invocationCallOrder[0],
  );
  expect(spy3.mock.invocationCallOrder[0]).toBeGreaterThan(
    spy2.mock.invocationCallOrder[0],
  );
});

test("first -> second -> third(jest-extended)", () => {
  const spy1 = jest.fn(first);
  const spy2 = jest.fn(second);
  const spy3 = jest.fn(third);
  spy1();
  spy2();
  spy3();
  expect(spy1).toHaveBeenCalledBefore(spy2);
  expect(spy3).toHaveBeenCalledAfter(spy2);
});

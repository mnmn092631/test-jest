import { sum, obj } from "./toHaveBeenCalled";

test("sum 함수가 호출되었다", () => {
  // jest.fn(): 함수가 몇번 호출 되었고 호출할 때 어떤 인수를 썼는지 등의 정보를 갖고 있음
  const sumSpy = jest.fn(sum);
  sumSpy(1, 2);
  // 함수가 호출되었는지를 테스트
  expect(sumSpy).toHaveBeenCalled();
});

test("sum 함수가 1번 호출되었다", () => {
  const sumSpy = jest.fn(sum);
  sumSpy(1, 2);
  // 함수가 몇 번 호출되었는지를 테스트
  expect(sumSpy).toHaveBeenCalledTimes(1);
});

test("sum 함수가 1,2와 함께 호출되었다", () => {
  const sumSpy = jest.fn(sum);
  sumSpy(1, 2);
  // 함수가 어떤 인수를 받아서 호출되었는지를 테스트
  expect(sumSpy).toHaveBeenCalledWith(1, 2);
});

// object의 메서드를 테스트
test("obj.minus 함수가 1번 호출되었다(spy 함수 생성)", () => {
  // 스파이 함수를 따로 만드는 것
  // 기존 object의 메서드가 변형되지 않음
  const minusSpy = jest.fn(obj.minus);
  minusSpy(1, 2);
  expect(minusSpy).toHaveBeenCalledTimes(1);
});
test("obj.minus 함수가 1번 호출되었다(spy 삽입)", () => {
  // 기존 object의 메서드에 스파이를 심는 것
  // 기존 object의 메서드가 변형됨(mock 함수가 됨)
  const minusSpy = jest.spyOn(obj, "minus");
  const result = obj.minus(1, 2);
  expect(minusSpy).toHaveBeenCalledTimes(1);
  expect(result).toBe(-1);
});

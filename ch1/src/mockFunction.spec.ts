import { obj } from "./mockFunction";

let spyFn;

describe("beforeEach/afterEach 적용", () => {
  test("obj.minus 함수가 1번 호출되었다(spy 삽입)", () => {
    spyFn = jest.spyOn(obj, "minus");
    const result = obj.minus(1, 2);
    expect(obj.minus).toHaveBeenCalledTimes(1);
    expect(result).toBe(-1);
  });

  test("obj.minus에 스파이를 심고 실행도 안되게", () => {
    // obj.minus가 빈 함수(() => {})가 되어버림
    spyFn = jest.spyOn(obj, "minus").mockImplementation();
    const result = obj.minus(1, 2); // undefined
    expect(obj.minus).toHaveBeenCalledTimes(1);
    expect(result).not.toBe(-1);
  });

  beforeEach(() => {
    console.log("각 테스트 전에 실행");
  });

  afterEach(() => {
    console.log("각 테스트 후에 실행");
    // spyFn.mockRestore();
    jest.restoreAllMocks();
  });
});

test("obj.minus에 스파이를 심고 리턴값을 바꾸게(mockImplementation)", () => {
  // obj.minus가 (a, b) => a + b가 되어버림(매개변수를 그대로 가져올 수 있음)
  spyFn = jest.spyOn(obj, "minus").mockImplementation((a, b) => a + b);
  const result = obj.minus(1, 2);
  expect(obj.minus).toHaveBeenCalledTimes(1);
  expect(result).toBe(3);
});

test("obj.minus에 스파이를 심고 리턴값을 바꾸게(mockImplementationOnce)", () => {
  // 한번만 함수를 바꿈 그 후에는 원래 함수로 돌아감
  spyFn = jest
    .spyOn(obj, "minus")
    .mockImplementationOnce((a, b) => a + b)
    .mockImplementationOnce(() => 5);
  const result1 = obj.minus(1, 2);
  const result2 = obj.minus(1, 2);
  const result3 = obj.minus(1, 2);
  expect(obj.minus).toHaveBeenCalledTimes(3);
  expect(result1).toBe(3);
  expect(result2).toBe(5);
  expect(result3).toBe(-1);
});

test("obj.minus에 스파이를 심고 리턴값을 바꾸게(mockImplementation, mockImplementationOnce)", () => {
  // 한번만 함수를 바꿈 그 후에는 원래 함수로 돌아감
  spyFn = jest
    .spyOn(obj, "minus")
    .mockImplementationOnce((a, b) => a + b)
    .mockImplementationOnce(() => 5)
    .mockImplementation(() => 3);
  const result1 = obj.minus(1, 2);
  const result2 = obj.minus(1, 2);
  const result3 = obj.minus(1, 2);
  expect(obj.minus).toHaveBeenCalledTimes(3);
  expect(result1).toBe(3);
  expect(result2).toBe(5);
  expect(result3).toBe(3);
});

test("obj.minus에 스파이를 심고 리턴값이 다르게 나오게(mockReturnValue)", () => {
  // 리턴값을 바꿈
  spyFn = jest.spyOn(obj, "minus").mockReturnValue(5);
  const result = obj.minus(1, 2);
  expect(obj.minus).toHaveBeenCalledTimes(1);
  expect(result).toBe(5);
});

test("obj.minus에 스파이를 심고 리턴값이 다르게 나오게(mockReturnValueOnce)", () => {
  // 리턴값을 한번만 바꿈
  spyFn = jest
    .spyOn(obj, "minus")
    .mockReturnValueOnce(5)
    .mockReturnValueOnce(3)
    .mockReturnValue(8);
  const result1 = obj.minus(1, 2);
  const result2 = obj.minus(1, 2);
  const result3 = obj.minus(1, 2);
  expect(obj.minus).toHaveBeenCalledTimes(3);
  expect(result1).toBe(5);
  expect(result2).toBe(3);
  expect(result3).toBe(8);
});

// mockImplementation은 함수 내부 구현까지 바꿀 수 있고, mockReturnValue는 단순히 리턴값만 바꿈

beforeAll(() => {
  console.log("이 파일의 준비사항 실행");
});

afterAll(() => {
  console.log("모든 테스트가 끝난 후");
});

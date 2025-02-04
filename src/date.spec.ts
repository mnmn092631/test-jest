import { after3days } from "./date";

test("3일 후를 리턴한다", () => {
  jest.useFakeTimers().setSystemTime(new Date(2024, 3, 9)); // 시스템 시간 변경
  console.log(new Date()); // 2024. 4. 9.
  expect(after3days()).toStrictEqual(new Date(2024, 3, 12));
});

afterEach(() => {
  jest.useRealTimers(); // useFakeTimers로 설정한 시간을 되돌려놓기
});

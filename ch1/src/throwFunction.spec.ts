import { error, customError, CustomError } from "./throwFunction";

test("error가 잘 난다(toThrow)", () => {
  // error() 자체에서 에러가 발생해서 failed가 되기 때문에 함수로 감싸서 전달해야 함
  expect(() => error()).toThrow(Error);
  expect(() => customError()).toThrow(CustomError);
});

test("error가 잘 난다(try/catch)", () => {
  try {
    error();
  } catch (err) {
    // err는 더이상 에러가 아니라 객체이기 때문에 toStrictEqual을 사용해서 에러 객체끼리 같은지 비교해야 함
    expect(err).toStrictEqual(new Error());
  }
});

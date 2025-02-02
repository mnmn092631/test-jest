import { timer } from "./callback";

test("타이머 실행", (done) => {
  timer((message: string) => {
    expect(message).toBe("success");
    // 콜백함수 테스트 시에 테스트를 멈추고 싶을 때 done을 실행해야 함
    // done을 실행하지 않으면 비동기적으로 기다려주지 않음(message 값이 무엇이든 passed를 반환함)
    done();
  });
});

// 웬만하면 콜백함수를 테스트 안하는 것이 좋고, 꼭 테스트를 해야한다면 Promise로 바꿔서 할 것

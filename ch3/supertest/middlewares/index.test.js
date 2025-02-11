const { isLoggedIn, isNotLoggedIn } = require("./index");

describe("isLoggedIn", () => {
  test("로그인을 했으면 next를 호출한다", () => {
    const req = {
      isAuthenticated() {
        // 로그인을 한 상태면 true를 반환
        return true;
      },
    };
    const res = {};
    const next = jest.fn();
    isLoggedIn(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });
});

describe("isLoggedIn", () => {
  test("로그인을 안 한 상태면 403 '로그인 필요'를 응답한다", () => {
    const req = {
      isAuthenticated() {
        // 로그인을 안 한 상태면 false를 반환
        return false;
      },
    };
    const res = {
      status: jest.fn(() => res), // 화살표 함수에서는 this가 바뀌기 때문에 res를 return하게 함
      send: jest.fn(),
    };
    const next = jest.fn();
    isLoggedIn(req, res, next);
    expect(next).not.toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith("로그인 필요");
  });
});

describe("isNotLoggedIn", () => {
  test("로그인을 안 했으면 next를 호출한다", () => {
    const req = {
      isAuthenticated() {
        // 로그인을 안 한 상태면 false를 반환
        return false;
      },
    };
    const res = {};
    const next = jest.fn();
    isNotLoggedIn(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });
});

describe("isNotLoggedIn", () => {
  test("로그인을 한 상태면 리다이렉트 한다", () => {
    const req = {
      isAuthenticated() {
        // 로그인을 한 상태면 true를 반환
        return true;
      },
    };
    const res = {
      redirect: jest.fn(),
    };
    const next = jest.fn();
    isNotLoggedIn(req, res, next);
    expect(next).not.toHaveBeenCalledTimes(1);
    expect(res.redirect).toHaveBeenCalledWith(
      `/?error=${encodeURIComponent("로그인한 상태입니다.")}`,
    );
  });
});

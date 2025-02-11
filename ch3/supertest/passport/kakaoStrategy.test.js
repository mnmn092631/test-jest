const { User } = require("../models");
const kakaoStrategyInit = require("./kakaoStrategy");

describe("kakaoStrategy", () => {
  it("이미 가입한 유저면 done 콜백을 호출한다", async () => {
    const profile = {
      id: 1,
      _json: {
        kakao_account: {
          email: "test@email.com",
        },
      },
      displayName: "test",
    };
    const done = jest.fn();

    jest.spyOn(User, "findOne").mockResolvedValue({ id: 1 });
    jest.spyOn(User, "create").mockImplementation();

    await kakaoStrategyInit.kakaoStrategy(null, null, profile, done);
    expect(done).toHaveBeenCalledWith(null, { id: 1 });
    expect(User.create).not.toHaveBeenCalled();
  });

  it("유저 조회 중에 에러가 발생하면 에러를 응답한다", async () => {
    const error = new Error();
    const profile = {
      id: 1,
      _json: {
        kakao_account: {
          email: "test@email.com",
        },
      },
      displayName: "test",
    };
    const done = jest.fn();

    jest.spyOn(User, "findOne").mockRejectedValue(error);
    jest.spyOn(User, "create").mockImplementation();

    await kakaoStrategyInit.kakaoStrategy(null, null, profile, done);
    expect(done).toHaveBeenCalledWith(error);
    expect(User.create).not.toHaveBeenCalled();
  });

  it("이미 가입한 계정이 아니면 회원가입을 진행한다", async () => {
    const profile = {
      id: 1,
      _json: {
        kakao_account: {
          email: "test@email.com",
        },
      },
      displayName: "test",
    };
    const done = jest.fn();

    jest.spyOn(User, "findOne").mockResolvedValue(null);
    jest.spyOn(User, "create").mockResolvedValue({
      id: 1,
    });

    await kakaoStrategyInit.kakaoStrategy(null, null, profile, done);
    expect(done).toHaveBeenCalledWith(null, { id: 1 });
    expect(User.create).toHaveBeenCalledWith({
      email: profile._json?.kakao_account?.email,
      nick: profile.displayName,
      snsId: profile.id,
      provider: "kakao",
    });
  });
});

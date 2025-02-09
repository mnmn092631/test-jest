const { join } = require("./auth");
const User = require("../models/user");
const bcrypt = require("bcrypt");

describe("join", () => {
  it("이메일이 없으면 프론트로 no_email 에러를 쿼리스트링으로 보낸다", async () => {
    const req = {
      body: {
        email: "",
        nick: "test",
        password: "test0!",
      },
    };
    const res = {
      redirect: jest.fn(),
    };
    const next = () => {};

    await join(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith("/join?error=no_email");
  });

  it("닉네임이 없다면 프론트로 no_nick 에러를 쿼리스트링으로 보낸다", async () => {
    const req = {
      body: {
        email: "test@email.com",
        nick: "",
        password: "test0!",
      },
    };
    const res = {
      redirect: jest.fn(),
    };
    const next = () => {};

    await join(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith("/join?error=no_nick");
  });

  it("비밀번호가 없다면 프론트로 no_password 에러를 쿼리스트링으로 보낸다", async () => {
    const req = {
      body: {
        email: "test@email.com",
        nick: "test",
        password: "",
      },
    };
    const res = {
      redirect: jest.fn(),
    };
    const next = () => {};

    await join(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith("/join?error=no_password");
  });

  it("이미 가입한 이메일이면 에러를 띄운다", async () => {
    const req = {
      body: {
        email: "test@email.com",
        nick: "test",
        password: "test0!",
      },
    };
    const res = {
      redirect: jest.fn(),
    };
    const next = () => {};

    jest.spyOn(User, "findOne").mockResolvedValue({ id: 1 });
    jest.spyOn(User, "create").mockImplementation();

    await join(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith("/join?error=exist");
    expect(User.create).not.toHaveBeenCalled();
  });

  it("회원가입 도중에 에러가 발생하면 에러를 응답한다", async () => {
    const req = {
      body: {
        email: "test@email.com",
        nick: "test",
        password: "test0!",
      },
    };
    const res = {
      redirect: jest.fn(),
    };
    const next = jest.fn();
    const error = new Error();

    jest.spyOn(User, "findOne").mockRejectedValue(error);
    jest.spyOn(User, "create").mockImplementation();

    await join(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
    expect(User.create).not.toHaveBeenCalled();
  });

  it("이미 가입한 이메일이 아니면 회원가입을 진행한다(암호화 후 DB 저장)", async () => {
    const req = {
      body: {
        email: "test@email.com",
        nick: "test",
        password: "test0!",
      },
    };
    const res = {
      redirect: jest.fn(),
    };
    const next = jest.fn();

    jest.spyOn(User, "findOne").mockResolvedValue(null);
    jest.spyOn(User, "create").mockImplementation();
    jest.spyOn(bcrypt, "hash").mockResolvedValue("hashed");

    await join(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith("/");
    expect(User.create).toHaveBeenCalledWith({
      email: "test@email.com",
      nick: "test",
      password: "hashed",
    });
  });
});

describe("login", () => {});

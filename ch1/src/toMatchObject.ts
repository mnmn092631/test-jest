class TestObject {
  a: string;
  constructor(str: string) {
    this.a = str;
  }
}

export function obj(str: string) {
  return new TestObject(str);
}

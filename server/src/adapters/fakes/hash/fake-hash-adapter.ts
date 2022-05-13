import { HashAdapter } from "../../hash-adapter";

export class FakeHashAdapter implements HashAdapter {
  async hash(payload: string): Promise<string> {
    return `hashed-${payload}`;
  };

  async compare(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed.replace('hashed-', '');
  };
}
import { hash, compare } from 'bcrypt'

import { HashAdapter } from "../hash-adapter";

export class BcryptHashAdapter implements HashAdapter {
  async hash(payload: string): Promise<string> {
    return hash(payload, 8)
  };

  async compare(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed)
  };
}
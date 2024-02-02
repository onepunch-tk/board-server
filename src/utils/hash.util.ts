import * as bcrypt from 'bcrypt';

interface IBcryptResult {
  success: boolean;
}

interface IHashingResult extends IBcryptResult {
  hash?: string;
}

interface ICompareResult extends IBcryptResult {}

const SALT_ROUND = 10;
export const passwordHashing = async (
  password: string,
): Promise<IHashingResult> => {
  try {
    return {
      success: true,
      hash: await bcrypt.hash(password, SALT_ROUND),
    };
  } catch (e) {
    return {
      success: false,
    };
  }
};

export const passwordCompare = async (
  hash: string,
  password: string,
): Promise<ICompareResult> => {
  try {
    return {
      success: await bcrypt.compare(password, hash),
    };
  } catch (e) {
    return {
      success: false,
    };
  }
};

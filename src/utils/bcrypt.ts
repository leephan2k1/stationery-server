import * as bcrypt from 'bcrypt';
import { SALT } from 'src/common/constants/bcryptSalt';

export async function encodePassword(reqPassword: string) {
  const salt = await bcrypt.genSalt(SALT);
  return await bcrypt.hash(reqPassword, salt);
}

export async function decodePassword({
  reqPassword,
  currentPassword,
}: {
  reqPassword: string;
  currentPassword: string;
}) {
  return await bcrypt.compare(reqPassword, currentPassword);
}

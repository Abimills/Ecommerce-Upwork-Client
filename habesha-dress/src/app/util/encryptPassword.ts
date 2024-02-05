import bcrypt from "bcrypt";

const encryptPassword = async (password: any) => {
  const salt = await bcrypt.genSalt();
  const encryptedPassword = await bcrypt.hash(password, salt);
  return encryptedPassword;
};

export default encryptPassword;

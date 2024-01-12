import bcrypt from 'bcrypt';

const hashPassword = (userPassword: string) => {
  const saltRound = 10;
  const salt = bcrypt.genSaltSync(saltRound);
  const hash = bcrypt.hashSync(userPassword, salt);
  return hash;
};

const comparePassword = (userPassword: string, hashPassword: string) => {
  return bcrypt.compare(userPassword, hashPassword);
};

export { hashPassword, comparePassword };

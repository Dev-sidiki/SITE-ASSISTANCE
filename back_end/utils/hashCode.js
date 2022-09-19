import bcrypt from "bcrypt";
const salt = 10;
// fonction d'achage du mot de passe
export const hashPassword = (newPassword) => {
  //   remplace le mot de passe par un mot de passe crypter
  const NewPasswordHash = bcrypt.hashSync(newPassword, salt);
  return NewPasswordHash;
};

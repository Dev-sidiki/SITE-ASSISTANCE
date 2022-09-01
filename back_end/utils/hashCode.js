import bcrypt from "bcrypt";
// fonction d'achage du mot de passe
export const hashPassword = (newPassword) => {
  const salt = 10;
  //   remplace le mot de passe par un mot de passe crypter
  const NewPasswordHash = bcrypt.hashSync(newPassword, salt);
  return NewPasswordHash;
};

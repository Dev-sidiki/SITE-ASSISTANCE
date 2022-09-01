import nodemailer from "nodemailer";

// creation du transporteur(celui qui envoi le mail) de façon automatique
// depuis ce site : https://ethereal.email/create
// il s'agit d'une fausse configuration avec des données éphémère
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    //creation d'un email éphémère
    user: "shyann.paucek42@ethereal.email",
    // creation de password
    pass: "HBhYUFtP2hAgWMMFDp",
  },
});

// la fonction qui permet d'envoyer le courrier au client
const send = async (info) => {
  // send mail with defined transport object
  let result = await transporter.sendMail(info);

  //   on affiche l'identifiant du mail envoyé
  console.log("Message sent: %s", result.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

// fonction qui gere la procedure du courrier electronique
// il contient tous les infos sur le courrier à envoyé
export const emailProcess = ({ email, pin, type, verificationLink = "" }) => {
  let info = "";
  switch (type) {
    case "recup-code-pin":
      info = {
        from: '"KSTransport <shyann.paucek42@ethereal.email>', //expéditeur
        to: email, // destinataires
        subject: "Code pine de réinitialisation du mot de passe", // Objet du mail
        text:
          "Bonjour, voici le Code pine de réinitialisation du mot de passe" +
          pin +
          " Ce code expirera en un jour", // message en format text brut
        html: `<b>Bonjour </b>
        voici le Code pine de réinitialisation du mot de passe
      <b>${pin} </b>
      " Ce code expirera dans un jour
      <p></p>`, // message en format html
      };

      send(info);
      break;

    case "modification-mot-de-passe":
      info = {
        from: '"KSTransport <shyann.paucek42@ethereal.email>', //expéditeur
        to: email, // destinataire
        subject: "Modification mot de passe", // Objet du mail
        text: "Bonjour, votre mot de passe à été modifié avec succès", // message en texte brut
        html: `<b>Bonjour </b>
       
      <p>votre mot de passe à été modifié avec succès</p>`, // message en format html
      };

      send(info);
      break;

      // case "new-user-confirmation-required":
      //   info = {
      //     from: '"KSTransport <shyann.paucek42@ethereal.email>', //expéditeur
      //     to: email, // destinataires
      //     subject: "Please verify your new user", // sujet du message
      //     text: "Please follow the link to very your account before you can login", // message en texte brut
      //     html: `<b>Hello </b>
      //     <p>Please follow the link to very your account before you can login</p>
      //     <p>${verificationLink}</P>
      //     `, // version html du message
      //   };

      send(info);
      break;

    default:
      break;
  }
};

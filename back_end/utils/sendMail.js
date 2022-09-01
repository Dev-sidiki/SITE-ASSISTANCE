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
    case "request-new-password":
      info = {
        from: '"CMR Company" <shyann.paucek42@ethereal.email>', //expéditeur
        to: email, // destinataire
        subject: "Password rest Pin", // Objet du mail
        text:
          "Here is your password rest pin" +
          pin +
          " This pin will expires in 1day", // message en format text brut
        html: `<b>Hello </b>
      Here is your pin 
      <b>${pin} </b>
      This pin will expires in 1day
      <p></p>`, // message en format html
      };

      send(info);
      break;

    case "update-password-success":
      info = {
        from: '"CMR Company" <shyann.paucek42@ethereal.email>', //expéditeur
        to: email, // list of receivers
        subject: "Password updated", // Subject line
        text: "Your new password has been update", // plain text body
        html: `<b>Hello </b>
       
      <p>Your new password has been update</p>`, // html body
      };

      send(info);
      break;

    case "new-user-confirmation-required":
      info = {
        from: '"CMR Company"<shyann.paucek42@ethereal.email>', //expéditeur
        to: email, // list of receivers
        subject: "Please verify your new user", // Subject line
        text: "Please follow the link to very your account before you can login", // plain text body
        html: `<b>Hello </b>
        <p>Please follow the link to very your account before you can login</p>
        <p>${verificationLink}</P>
        `, // html body
      };

      send(info);
      break;

    default:
      break;
  }
};

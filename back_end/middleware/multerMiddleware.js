import multer from "multer";

// collection des extensions acceptés
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/png": "png",
};

// la destination du fichier (repertoire) et generer un nom de fichier unique
const storage = multer.diskStorage({
  // la destination du fichier
  destination: (req, file, callback) => {
    callback(null, "./images");
  },
  filename: (req, file, callback) => {
    // console.log(file);
    // on supprime les espaces pour mettre un "_"
    const name = file.originalname.split(" ").join("_");
    // on recupère les extentions
    const extension = MIME_TYPES[file.mimetype];
    // pour rendre un fichier unique au cas ou on n'as les mêmes noms
    // callback(null, name + Date.now() + "." + extension);
    // avec es6
    callback(null, `${name}_${Date.now()}.${extension}`);
  },
});

// on indique que on veut envoyer qu'un seul fichier image
// le mot "image" doit être mis dans le form-data comme key
const imageMiddleware = multer({ storage: storage }).single("image");

export default imageMiddleware;

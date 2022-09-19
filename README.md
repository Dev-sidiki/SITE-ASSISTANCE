# SITE-ASSISTANCE

un site de gestion de ticket client

# """""""""""""""""""""""""""""""""""""""""" LES DEPENDANCES LIÉS A LA PARTIE BACK-END """""""""""""""""""""""""""""""""""""""""""""

# Initialisation du package.json, on ajoute le -y pour repondre oui à toute les questions

on tape la commande : npm init -y

# on installe express(le serveur), nodemon(pour definir un script de demarage pour eviter d'actualiser à chaque fois) et dotenv(stocker les variable d'environnement) suivante:

# NB:si notre app etait en cours d'execution avant la creation de notre fichier .env, il va falloir le relancer afin qu'il tient compte des variable issu de celui-ci

on tape la commande suite : npm i --save express nodemon dotenv

# dans le package.json ajouter le type module pour gerer les importation et changer le mode de demarage de l'app

"scripts": {
"start": "nodemon server.js"
},
{ "type" : "module" }

# on créer le fichier .gitignore pour preciser les fichiers ou dossiers à ne pas partager(pusher) sur le depot distant

node_modules
.env

# on connecte notre projet a mongo compass pour interface plus lisible

# si jamais on n'as du mal à se connecter à notre base de donnée on met à jour notre adresse ip depuis le site de mongo

# on install mongoose pour connecter notre base de donné a notre back grace a l'identifiant que on n'as reçu sur mongo atlas

on tape la commande : npm i -s mongoose

# on install une librairi de validation d'une donnée

on tape la commande: npm install validator

# on install l'objet router pour la gestion des routes

on tape la commande suivate : npm install router

# on install body parser pour pouvoir recuperer nos donneés

on tape la commande :npm i -s body-parser

# on install la bibliotèque pour cripter les mots de passe ou mails

on tape la command suivante: npm i -s bcrypt

# on install la bibliotèque pour gerer les token de connexions

on tape la command suivante: npm i -s jsonwebtoken

# on install la bibliotèque pour la securité de l'api

on tape la command suivante:npm install helmet --save

# on install la bibliotèque pour la gestion des requette (utile pour le debug)

on tape la command suivante:npm install morgan --save

# on install la bibliotèque pour faire les requettes depuis un autre serveur

on tape la command suivante: npm i -s cors

# on install la bibliotèque pour faire les l'envoi des mails

on tape la command suivante: npm install nodemailer --save

# """""""""""""""""""""""""""""""""""""""""" LES DEPENDANCES LIÉS A LA PARTIE FRONT-END """""""""""""""""""""""""""""""""""""""""""

# on crée notre app react

# le nom du projet sera le nom du dossier avec le .

on tape la commande suivante : npx create-react-app .

# on install bootstrap pour le style

on tape la commande suivante: npm install react-bootstrap bootstrap

# on install react-router-dom pour la navigation

on tape la commande suivante: npm i -s react-router-dom ou npm install react-router-dom@5.2.0 (en cas de problème avec la navigation)

# on install axios

on tape la commande suivante: npm i -s axios

# on intall le module pour la validé des prop qu'on donne aux composant

on tape la commande suivante: npm install --save prop-types

# REMARQUE:

# export default function x ()

cela veut dire on peut importer la fonction sans accolade avec le nom que on veut dans a n'importe quel endroit du code

# Exemple : voir dossier utile et server.js etupdatepin.js

# export function x ()

cela veut dire on peut importer la fonction avec accolade avec obligatoirement le meme nom de fonction a n'importe quel endroit du code

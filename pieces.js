// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

for (let i = 0; i < pieces.length; i++) {
//Création des balises
const article = pieces[i];
// Récupération de l'élément du DOM qui accueillera les fiches
const sectionFiches = document.querySelector(".fiches");
// Création d’une balise dédiée à une pièce automobile
const pieceElement = document.createElement("article");
// Création des balises 
const imageElement = document.createElement("img");
imageElement.src = article.image;

const nomElement = document.createElement("h2");
nomElement.innerText = article.nom;

const prixElement = document.createElement("p");
prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`; //Si le prix est inférieur à 35€ alors on ajoute un symbole €, sinon on en ajoute €€€ 
//C'est ce qu'on appelle des litéreaux de gabarit (template strings), permettent de concaténer plus facilement des chaînes de caractères et des variables.
//idem prixElement.innerText = "Prix: " + article.prix + " €";
const categorieElement = document.createElement("p");
categorieElement.innerText = article.categorie ?? "(aucune catégorie)"; //L’opérateur nullish utilisera la valeur de substitution uniquement dans le cas où l’expression à tester fournit la valeur null ou undefined. Dans tous les autres cas, l’opérateur nullish gardera la valeur d’origine.

//Création des éléments pour l'exercice:
const descriptionElement = document.createElement("p");
descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";

const stockElement = document.createElement("p");
stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock"; //Opérateur ternaire s'utilise lorsqu'on doit choisir entre deux possiblilités. La syntaxe géné est formulée ainsi: expression à tester ? valeur si vraie : valeur si faux.

//Les quatre éléments ont été créés mais ils ne s’affichent pas encore à l’écran. 
//C’est normal car dans le navigateur, on distingue deux opérations : la création d’un élément, et son ajout réel à la page web. 
//Une fois qu’il a été ajouté, on dit qu’on a rattaché l'élément au reste du document.

//Pour faire ce rattachement(au DOM), nous avons besoin d’un parent. En effet, le DOM structure les éléments sous forme d’arbre avec des enfants et des parents. 
//Il faut donc trouver un parent pour accueillir nos nouveaux éléments. Ainsi, nous allons utiliser la fonction appendChild en JavaScript.
//Notre page web contient une balise section avec la classe “fiches” que nous utiliserons comme parent. Nous la récupérons grâce à querySelector :

// On rattache la balise article a la section Fiches
sectionFiches.appendChild(pieceElement);
// On rattache l’image à pieceElement (la balise article)
pieceElement.appendChild(imageElement);
pieceElement.appendChild(nomElement);
pieceElement.appendChild(prixElement);
pieceElement.appendChild(categorieElement);
//Ajout des éléments au DOM pour l'exercice:
pieceElement.appendChild(descriptionElement);
pieceElement.appendChild(stockElement);

}

const boutonTrier = document.querySelector(".btn-trier"); 
boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function(a,b){
        return a.prix - b.prix;
    });
    console.log(piecesOrdonnees);
});

//Pour le moment, les fiches produit restent dans le même ordre, c'est normal.
//Nous verront comment mettre à jour l'écran à la suite de ces évènements.
//On constate en ouvrant la console, que la liste est bien réordonée.

const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
});

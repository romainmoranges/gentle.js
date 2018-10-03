document.addEventListener("DOMContentLoaded", function() {

  //Ajax récupération json
  var request = new XMLHttpRequest();
  request.open('GET', 'js/data.json');
  request.responseType = 'json';
  request.send();

  // évènement
  request.onload = function() {

    //Variables
    var myData = request.response;

    var gentleText = myData['gentle']['text'];
    var vulgarText = myData['vulgar']['text'];

    var contenuText = document.getElementById('texte').textContent; //Je pourrais utiliser document.body.textContent, mais il comptabilise aussi les \n des saut de ligne,
                                                                    //Donc je préfère me servir de getElementById en attendant de trouver une solution
    // On crée le boutton qui permet d'appeler la fonction
    document.body.innerHTML+= "<button id='btn'>Voulez-vous remplacer les insultes par quelque chose de plus mignon?</button>";

    // On définit la listener et on appelle la fonction compareText, qui prend en paramètre la valeur retournée par getText, gentleText et vulgarText.
    var btn = document.getElementById("btn");
    btn.addEventListener("click", function() {compareText(getText(contenuText), gentleText, vulgarText);} );

  }

  //Définition des fonctions

  // Sert à récupérer le texte et à concaténer chaque mot par des virgules, dans un tableau. Elle prend en paramètre un texte obtenu avec la méthode .textContent
  function getText(a) {
    //La méthode split() permet de diviser une chaîne de caractères à partir d'un séparateur pour fournir un tableau de sous-chaînes.
    //On enregistre et retourne tout ca dans une variable resultatText, qui est donc un tableau composé de plusieurs mots.
    var resultatText = a.split(" ");
    return resultatText;
  }

  /*Sert à comparer et remplacer le texte à notre fichier json. Elle prend en paramètre le contenu texte sous forme de tableau, grace à getText, gentleText et vulgarText, obtenus avec le json.*/
  function compareText(x, y, z) {
    // pour i=0, i < la longueur du contenuText, i++ (parcours du texte)
    for (i = 0; i < x.length; i++) {
      // pour j=0, j < la longueur de vulgarText, j++ (parcours du json vulgar)
      for (j = 0; j < z.length; j++) {
        // si une valeur du contenuText[i] != de vulgarText[j]
        if (x[i] != z[j]) {
          // alors rien
        }
        // sinon si une valeur du contenuText[i] == de vulgarText[j]
        else if (x[i] == z[j]) {
          // alors remplacer contenuText[i] par aléatoire gentleText

          // On définit une variable max qui correspond à la longueur de notre tableau gentleText
          var max = y.length;

          // On définit une variable ran, référence à une fonction qui retourne une valeur aléatoire entre 0 et la valeur de max
          var ran = function(max) {
            return Math.floor(Math.random() * Math.floor(max));
          }

          // On remplace la valeur contenuText[i] par un span avec le contenu de gentleText[ran(max)]
          document.body.innerHTML = document.body.innerHTML.replace(x[i], " <span class='gentleText'>" + y[ran(max)] + "</span>");


        }
      }
    }
  }

});

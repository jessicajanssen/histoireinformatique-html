// fonctions pour utiliser les cookies ...
/*
quelques renseignements sur les cookies
syntaxe d'un cookie en javascript
document.cookie = 'ppkcookie2=un autre test; expires=Mon, 1 Mar 2010 00:00:00 UTC; path=/'
chaque partie est séparée par un ; avec un espace
possibilité d'utiliser un argument pour https mode secure
*/
// on pourrait rajouter un dernier argument à cette fonction pour gérer le protocole https
/*
attention: nombre limité de cookie et taille limitée aussi
nb total de cookies = 300
taille d'un cookie = 4 Ko
maximum 20 cookies par domaine (site)
sessionStorage - localStorage (javascript)
voir API de stockage Web Storage et IndexedDB
taille storage 10 Mb
l'internaute peut supprimer les cookies au niveau de ses navigateurs (cf options ou paramètres)
donc ce n'est pas une donnée qui est persistante ...
nom pour définir le nom du cookie
valeur pour définir la valeur contenue dans cette variable cookie (du texte, sinon sérialiser un objet encodeURIComponent)
nbJours pour définir le nombre de jours pour la validité (théoriquement maximum 1 an)
chemin pour définir la partie de l'arborescence où le cookie est valide si / pour pour le site
pour supprimer un cookie, mettre une date d'expiration antérieure à la date du jour ...
on ne peut interagir directement sur le pc du client à partir d'un site externe (sécurité)
*/

/*
attention
ok avec edge et chrome mais en passant par une URL http://nomDuServeur
ok avec firefox aussi en local que par l'intermédiaire d'un serveur
 */

/*
voir https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Set-Cookie/SameSite
par défaut SameSite est à Lax pour les navigateurs récents
voir .htaccess et mentionner dans la réécriture des URL la syntaxe voulue avec SameSite et secure
 */

// les fonctions utilitaires pour gérer les cookies ...

function activationCookies(){
    if (navigator.cookieEnabled)
        // l'objet navigator permet de récupérer des informations sur le navigateur utilisé
        return true;
    else
        return false;
}

function fct_Gcookie(value){
    console.log(value);
    var contenucookie = "";
    var nom = "accepterCookie";
    if ( value == "oui" ){
        contenucookie = "accepter cookies";
    }
    if ( value == "non" ){
        contenucookie = "pas accepter cookies";
    }
    creer_cookie(nom,contenucookie,365,"/"); //ok
    document.getElementById('divcookies').style.display = 'none';
}
function testerCookie(){
    if ( getCookie("accepterCookie") != null ) {
        //$('#divcookies').hide();
        document.getElementById('divcookies').style.display = 'none';
        console.log("cookie trouvé");
    }
    else {
        //$('#divcookies').show();
        document.getElementById('divcookies').style.display = 'block';
        console.log("cookie non trouvé");
    }
}
function creer_cookie(nom,valeur,nbJours,chemin){
    console.log("creer cookie");
    var date = new Date(); //date PC client
    date.setTime(date.getTime()+(nbJours*24*60*60*1000)); // exprimé en milli-secondes toujours en javascript
    var expires = "; expires="+date.toGMTString();
    console.log(nom+"="+valeur+expires+"; path="+ chemin);
    console.log( nom+"="+encodeURIComponent(valeur)+expires+"; path="+ chemin);
    document.cookie = nom+"="+encodeURIComponent(valeur)+expires+"; path="+ chemin;
}
/*
il faudrait rajouter pour être complet
;domain = nomDuDomaine
;Secure  si https
;HttpOnly cookie non accessible pour API javascript (éviter les attaques Cross-site scripting XSS
Les cookies SameSite laissent les serveurs exiger qu'un cookie ne soit pas envoyé avec les requêtes cross-site,
ce qui protège un peu contre les attaques Cross-Site Request Forgery (CSRF).
Les cookies SameSite sont encore expérimentaux et ne sont pas encore supportés par tous les navigateurs.
 */


function supprimer_cookie(nom,chemin){
    var date = new Date();
    date.setTime(date.getTime()-(10*24*60*60*1000)); // date antérieure à la date du pc
    var expires = "; expires="+date.toGMTString();
    document.cookie = nom+"="+""+expires+"; path="+ chemin;
}
function verifier_cookie(nom){
    var nomCookie = nom + "=";
    var tabCookie = document.cookie.split(';');
    for(var i=0;i < tabCookie.length;i++) {
        if (tabCookie[i].indexOf(nomCookie) == 0) // indexOf retourne la position de la chaîne, -1 si absente
            return true;
    }
}
function lire_cookie(nom){
    var nomCookie = nom + "=";
    var tabCookie = document.cookie.split(';'); // on récupère un tableau avec la méthode split
    for(var i=0;i < tabCookie.length;i++) {
        if (tabCookie[i].indexOf(nomCookie) == 0) // indexOf retourne la position de la chaîne, -1 si absente
            return decodeURIComponent(tabCookie[i].substring(nomCookie.length,tabCookie[i].length));
    }
    return null;
}
function getCookie(sName) {
    var oRegex = new RegExp("(?:; )?" + sName + "=([^;]*);?");
    if (oRegex.test(document.cookie)) {
        return decodeURIComponent(RegExp["$1"]);
    } else {
        return null;
    }
}


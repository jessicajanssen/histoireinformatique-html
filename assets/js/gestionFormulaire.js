// les fonctions pour le formulaire (validation côté client)

$(window).on('load',function() {
    CKEDITOR.replace ('commentaire'); // id du textarea
   // testerCookie();
});

function fctListerFormulaire() {
    var mess = "";
    var f = document.forms[0];
    for (let i = 0; i < f.elements.length; i++){
        mess += "type: " + f.elements[i].type + "; ";
        mess += "name: " + f.elements[i].name + "; ";
        mess += "id: " + f.elements[i].id + "; ";
        mess += "value: " + f.elements[i].value + "\n";
    }
    console.log(mess);
}

function reinitialiserComponents(){
    var tabField =["nom", "prenom", "telephone", "email", "specialite", "profession", "datenaissance"];
    for (let i = 0; i < tabField.length; i++){
        txtobj = "document.getElementById('" + tabField[i] + "')";
        obj = eval(txtobj);
        obj.style.backgroundColor = ""; // à revoir
    }
    var  tabErrorField = ["errorNom","errorPrenom","errorEmail","errorTelephone","errorDateNaissance","errorProfession","errorSpecialite","errorCommentaire"];
    for (let i = 0; i < tabErrorField.length; i++){
        txtobj = "document.getElementById('" + tabErrorField[i] + "')";
        //console.log(txtobj)
        obj = eval(txtobj);
        //console.log(obj);
        obj.innerHTML = "";
    }
}

function verifDateNaissance(date){
    var tabDate = date.split('-');
    var dd = parseInt(tabDate[2]);
    var mm  = parseInt(tabDate[1]);
    var yy = parseInt(tabDate[0]);
    var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];
    if (mm==1 || mm>2)
    {
        if (dd>ListofDays[mm-1])
        {
            console.log('mois incorrect!');
            return false;
        }
    }
    if (mm==2)
    {
        var lyear = false;
        if ( (!(yy % 4) && yy % 100) || !(yy % 400))
        {
            lyear = true;
        }
        if ((lyear==false) && (dd>=29))
        {
            console.log('problème février!');
            return false;
        }
        if ((lyear==true) && (dd>29))
        {
            //alert('problème février!');
            console.log('problème février!');
            return false;
        }
    }
    return true;
}

function fctValid() {
    var flag = true; //drapeau booléen
    var error = "";
    reinitialiserComponents();

    var nom,prenom,email,datenaissance,telephone,profession,commentaire,rgbdA,specialite;
    let f = document.contact;
    nom = f.nom.value.trim().toUpperCase();
    prenom = f.prenom.value.trim().toLowerCase();
    email = f.email.value.trim().toLowerCase();
    datenaissance = f.datenaissance.value;
    telephone = f.telephone.value;
    profession = f.profession.value;
    //commentaire = f.commentaire.value.trim(); // textarea donc text
    // pour récupérer avec CKEDITOR
    commentaire = CKEDITOR.instances.commentaire.getData();
    // tester Trumbowyg Editor https://alex-d.github.io/Trumbowyg/documentation/#installation

    // utiliser les autres possibilités pour récupérer les champs du formulaire
    // document.getElementById  ou syntaxe Jquery

    if ( f.rgbdA.checked )
        rgbdA =  f.rgbdA.value;
    else
        rgbdA = "";

    specialite = "";
    for ( let i = 0; i < f.specialite.options.length; i++){
        if ( f.specialite.options[i].selected )
            specialite += f.specialite.options[i].value + ";"
    }
    // w3Resource.com
    var patternEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; // à vérifier
    var patternTelephone = /^\+[0-9]{2}[\- ]{1}[0-9]{3}[\- ]{1}[0-9]{3}$/; // à vérifier
    var patternDatenaissance = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/;
    if ( nom.length == 0 ){
        flag = false;
        error += "le nom est obligatoire\n";
        document.getElementById('errorNom').innerHTML = "nom obligatoire";
        document.getElementById('nom').style.backgroundColor = "#72bac7";
    }
    if ( prenom.length == 0 ){
        flag = false;
        error += "le prénom est obligatoire\n";
        document.getElementById('errorPrenom').innerHTML = "prénom obligatoire";
        document.getElementById('prenom').style.backgroundColor = "#72bac7";
    }
    if ( email.length == 0 ){
        flag = false;
        error += "l'email est obligatoire\n";
        document.getElementById('errorEmail').innerHTML = "email obligatoire";
        document.getElementById('email').style.backgroundColor = "#72bac7";
    }
    else if ( email.indexOf('@') == -1 ){
        flag = false;
        error += "la syntaxe email est incorrecte\n";
        document.getElementById('errorEmail').innerHTML = "la syntaxe incorrecte";
    }
    else if ( email.indexOf('.',email.indexOf('@')) == -1 ){
        flag = false;
        error += "la syntaxe email est incorrecte\n";
        document.getElementById('errorEmail').innerHTML = "la syntaxe incorrecte";
    }
    else if (!patternEmail.test(email))
    {
        flag = false;
        error += "la syntaxe email est incorrecte\n";
        document.getElementById('errorEmail').innerHTML = "la syntaxe incorrecte";
    }
    if ( telephone.length == 0 ){
        flag = false;
        error += "le téléphone est obligatoire\n";
        document.getElementById('errorTelephone').innerHTML = "téléphone obligatoire";
        document.getElementById('telephone').style.backgroundColor = "#72bac7";
    }
    /* else if (!patternTelephone.test(telephone))
    {
        flag = false;
        error += "la syntaxe téléphone est incorrecte\n";
        document.getElementById('errorTelephone').innerHTML = "la syntaxe téléphone est incorrecte";
    }*/
    if ( datenaissance.length == 0 ){
        flag = false;
        error += "la date de naissance est obligatoire\n";
        document.getElementById('errorDateNaissance').innerHTML = "date obligatoire";
        document.getElementById('datenaissance').style.backgroundColor = "#72bac7";
    }
    else if (!patternDatenaissance.test(datenaissance))
    {
        flag = false;
        error += "la syntaxe date de naissance est incorrecte\n";
        document.getElementById('errorDateNaissance').innerHTML = "la syntaxe est incorrecte";
    }
    else if (!verifDateNaissance(datenaissance))
    {
        flag = false;
        error += "la syntaxe date de naissance est incorrecte\n";
        document.getElementById('errorDateNaissance').innerHTML = "la syntaxe est incorrecte";
    }
    if ( profession.length == 0 ){
        flag = false;
        error += "la profession est obligatoire\n";
        document.getElementById('errorProfession').innerHTML = "profession obligatoire";
        document.getElementById('profession').style.backgroundColor = "#72bac7";
    }
    if ( specialite.length == 0 ){
        flag = false;
        error += "la spécialité est obligatoire.\n choisissez une option minimum\n";
        document.getElementById('errorSpecialite').innerHTML = "choisissez une option";
        document.getElementById('specialite').style.backgroundColor = "#72bac7";
    }
    if ( commentaire.length == 0 ){
        flag = false;
        error += "le commentaire est obligatoire\n";
        document.getElementById('errorCommentaire').innerHTML = "commentaire obligatoire";
        document.getElementById('commentaire').style.backgroundColor = "#72bac7";
    }
    else if ( commentaire.length > 512 ){
        flag = false;
        error += "le commentaire ne peut comporter que 512 caractères au maximum\n";
        document.getElementById('errorCommentaire').innerHTML = "le commentaire ne peut comporter que 512 caractères au maximum";
    }
    return flag;
}

function fctReset(){
    verif =  confirm("Veuillez confirmer la suppression ...");
    if (verif) {
        reinitialiserComponents();
    }
    return verif;
}
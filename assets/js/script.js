class User {
    constructor(name, email, birthdate, address, phone, cpf, sign, age, client){
        this.name = name;
        this.email = email;
        this.birthdate = birthdate;
        this.address = address;
        this.phone = phone;
        this.cpf = cpf;
        this.sign = this.getZodiacSign();
        this.age = this.getAge();
        this.client = this.getClient();
    }

    getZodiacSign() {
        let birthdate = new Date(this.birthdate);
        let day = birthdate.getDate();
        let month = birthdate.getMonth() + 1;
        console.log("Passou pelo getSigno() da class User");
    
        if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
            return "Capricórnio ♑";
        } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
            return "Aquário ♒";
        } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
            return "Peixes ♓";
        } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
            return "Áries ♈";
        } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
            return "Touro ♉";
        } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
            return "Gêmeos ♊";
        } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
            return "Câncer ♋";
        } else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
            return "Leão ♌";
        } else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
            return "Virgem ♍";
        } else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
            return "Libra ♎";
        } else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
            return "Escorpião ♏";
        } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
            return "Sagitário ♐";
        }

    }
    
    getAge() {
        const today = new Date();
        const birthDate = new Date(this.birthdate);
        let ages = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        ages--;
        }
        return ages;
        }

    getClient() {
        if(this.getAge() > 17 && this.getAge() < 32){
            return "É um possivel clinte ✔";
        }else {
            return "Não é um possível cliente ❌";
        }
    }
}

class ListUsers {
    constructor(){
        this.users = [];
    }

    add(user) {
        if(isAnyInputEmpty() == true){
            sendErrorMsg("Preencha todos os campos");
        }else if(!valida_cpf(cpf)){
            sendErrorMsg("CPF invalido");
        } else if (formatedCPF(cpf)){
            sendErrorMsg("CPF já cadastrado")
        } else{
            this.users.push(user);
            clearInputs();
        }
    }

}







const listUsers = new ListUsers()

function createUser() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const birthdate = document.getElementById("birthdate").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const cpf = document.getElementById("cpf").value;



    const user = new User(name, email, birthdate, address, phone, cpf);

    listUsers.add(user);
    console.log(user);

}

function removeUser() {
    listUsers.remove();
    showUsers();
}

function clearInputs(){
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("birthdate").value = "";
    document.getElementById("address").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("cpf").value = "";
}

function isAnyInputEmpty() {
    if( document.getElementById("name", "email", "birhdate", "address", "phone", "cpf").value = ""){
        return false
    }
   }


function sendErrorMsg(msg) {
    console.log("Passou pela funcao sendErrorMsg()");

    document.getElementById("error-msg").innerHTML = msg;
    document.getElementById("error-msg").classList.remove("hidden");
    setTimeout(function () {
        document.getElementById("error-msg").classList.add("hidden");
    }, 4000);
}

function valida_cpf(cpf) {
    console.log("Passou pela funcao valida_cpf()");

    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
        return false;
    for (i = 0; i < cpf.length - 1; i++)
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    if (!digitos_iguais) {
        numeros = cpf.substring(0, 9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--)
            soma += numeros.charAt(10 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
        numeros = cpf.substring(0, 10);
        soma = 0;
        for (i = 11; i > 1; i--)
            soma += numeros.charAt(11 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
        return true;
    }
    else
        return false;
}

function formatedCPF(cpf) {
    console.log("Passou pela funcao formatedCPF()");

    let cpfArray = cpf.split("");
    let cpfFormated = cpfArray[0] + cpfArray[1] + cpfArray[2]
        + "." + cpfArray[3] + cpfArray[4] + cpfArray[5] + "."
        + cpfArray[6] + cpfArray[7] + cpfArray[8] + "-" + cpfArray[9] + cpfArray[10];
    return cpfFormated;
}

function showRegister(){
    document.getElementById("sub-div").classList.add("hidden");
    document.getElementById("title-page").classList.remove("hidden;");
    document.getElementById("main-div").classList.remove("hidden;");
}




function showUsers() {
    document.getElementById("user-list").classList.remove("hidden");
    let showContent = "";

    ListUsers.users.forEach(user => {
        showContent += `
        <div id="result-div2">
        <p> Nome: ${user.name}</p>
        <p> Idade: ${user.getAge}</p>
        <p> Signo: ${user.getZodiacSign}</p>
        <p> Email: ${user.email}</p>
        <p> Cidade: ${user.address}</p>
        <p> Telefone: ${user.phone}</p>
        <p> CPF: ${user.cpf}</p>
        <p> Cliente: ${user.getClient}</p>
        
        <button id="button-register" onclick="showRegister()" type="button">Voltar</button>`
    });

    console.log(this.users);
    document.getElementById("sub-div").classList.remove("hidden");
    document.getElementById("title-page").classList.add("hidden");
    document.getElementById("main-div").classList.add("hidden");


    document.getElementById("result-div").innerHTML = showContent;
}



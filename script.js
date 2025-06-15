//Objeto do usuario
/*let usuario = {
    user,
    password,
    tasks: {
        name,
        due_date,
        done
    }
};*/


//Referencias ao html:
//To-do list ---------------------------------------------

//lista de tarefas
const tasklist = document.getElementById("lista");

//botoes do html
const addTaskButton = document.getElementById("botaoAdiciona");
addTaskButton.disabled = true;
const signInButton = document.getElementById("login");
const themeModeButton = document.getElementById("modo");

//inputs do html
const taskInput = document.getElementById("tarefa");
const DueDateInput = document.getElementById("data");

//Auxiliares de persistência
function obterUsuarios() {
    const data = localStorage.getItem("usuarios");
    return data ? JSON.parse(data) : [];
}

function salvarUsuarios(lista) {
    localStorage.setItem("usuarios", JSON.stringify(lista));
}

function obterUsuarioLogado() {
    return localStorage.getItem("usuarioLogado");
}

function definirUsuarioLogado(email) {
    localStorage.setItem("usuarioLogado", email);
}

function deslogarUsuario() {
    localStorage.removeItem("usuarioLogado");
}


//Adiciona eventos ao clicar nos botoes (se existir):
//To-Do list Buttons---------------------------------------
if(addTaskButton){
    addTaskButton.addEventListener("click", function() {
        let taskDescription = taskInput.value;
        let dueDateValue = DueDateInput.value;
        if(taskDescription !== ""){
            AddTask(taskDescription, dueDateValue);
        }
    });
}

if(signInButton){
    signInButton.addEventListener("click", function() {
        window.location.href = "signIn.html";
    });
}

if(themeModeButton){
    themeModeButton.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
    });
}

taskInput.addEventListener("input", function() {
    if(taskInput.value !== ''){
        addTaskButton.disabled = false;
    }
    else{
        addTaskButton.disabled = true;
    }
});

//Sign in Buttons ------------------------------------------
function fazerLogin() {
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

    if (usuarioSalvo && usuarioSalvo.email === email && usuarioSalvo.senha === senha) {
        localStorage.setItem("usuarioLogado", "true");
        window.location.href = "index.html";
    } else {
        alert("Email ou senha inválidos.");
    }

    return false;
}


//Sing up Buttons ------------------------------------------
function criarConta() {
    const nome = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmaSenha = document.getElementById("confirmaSenha").value;

    if (!nome || !email || !senha || !confirmaSenha) {
        alert("Preencha todos os campos.");
        return false;
    }

    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem.");
        return false;
    }

    const usuario = { nome, email, senha };
    localStorage.setItem("usuario", JSON.stringify(usuario));
    alert("Conta criada com sucesso!");
    window.location.href = "signIn.html";
    return false;
}


//Verificacao de login
function verificarLogin() {
    const logado = localStorage.getItem("usuarioLogado");
    if (logado !== "true") {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "signIn.html";
    }
}

//Sign out
function logout() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "signIn.html";
}

//Funcoes dos botoes:
function FormatarData(dataValue){
    const partes = dataValue.split('-');  //divide em [ano, mes, dia]
    if (partes.length === 3) {
        return `Prazo: ${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return dataValue; //caso o valor seja NULL
};

function AddTask(taskDescription, dueDateValue){
    //cria as variaveis dos elementos a serem criados
    const listItem = document.createElement("li");
    const contentContainer = document.createElement("div");
    contentContainer.id = "taskContainer";
    const doneTask = document.createElement("input");
    doneTask.type = "checkbox";
    doneTask.id = "taskDone";
    const taskText = document.createElement("p");
    taskText.id = "taskText";
    const deleteButton = document.createElement("button");
    deleteButton.id = "taskDelete";
    const changeDate = document.createElement("input"); //Ainda vou implementar melhor para que possa mudar de data!!!
    changeDate.type = "date";
    changeDate.id = "taskDateInput";
    
    //coloca valor ao texto
    taskText.textContent = taskDescription; 
    deleteButton.textContent = "Delete"; 

    //o botao de delete vai excluir o item
    deleteButton.addEventListener("click", function() {
        tasklist.removeChild(listItem);
    });
    
    //adiciona a data se for informada
    let dueDate;

    if(dueDateValue !== ''){
        dueDate = document.createElement("p");
        dueDate.id = "taskDate";
        dueDate.textContent = FormatarData(dueDateValue);
        contentContainer.appendChild(taskText);
        contentContainer.appendChild(dueDate);
    }
    else{
        contentContainer.appendChild(taskText);
    }

    //Se o usuario mudar a data de dentro da tarefa
    changeDate.addEventListener("change", function() {
        if(!dueDate){
            dueDate = document.createElement("p");
            dueDate.id = "taskDate";
            contentContainer.appendChild(dueDate);
        }
        dueDate.textContent = FormatarData(changeDate.value);
    });
    
    //adiciona o elemento ao item da lista
    listItem.appendChild(doneTask);
    listItem.appendChild(contentContainer);
    listItem.appendChild(changeDate);
    listItem.appendChild(deleteButton);

    //adiciona a tarefa na lista
    tasklist.appendChild(listItem);

    //reseta os inputs
    taskInput.value = '';
    DueDateInput.value = '';
    addTaskButton.disabled = true;
};



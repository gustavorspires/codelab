//objeto do login do usuario
let login = {
    user,
    password,
    tasks: {
        name,
        due_date,
        done
    }
};

//lista de tarefas
const tasklist = document.getElementById('lista');

//botoes do html
const addTaskButton = document.getElementById('botaoAdiciona');
const loginButton = document.getElementById('login');
const ColorModeButton = document.getElementById('modo');

//inputs do html
const taskInput = document.getElementById('tarefa');
const DueDateInput = document.getElementById('data');

let taskDescription = taskInput.value;
let dueDateValue = DueDateInput.value;

//executa a funcao ao clicar no botao
addTaskButton.addEventListener('click',AddTask());
loginButton.addEventListener('click');
ColorModeButton.addEventListener('click');

//funcoes que executam quando clicam nos botoes
function AddTask(task){
    //cria as variaveis dos elementos a serem criados
    const listItem = document.createElement('li');
    const doneTask = document.createElement('input');
    const taskText = document.createElement('p');
    const deleteButton = document.createElement('button');
    
    //coloca valor ao texto
    taskText.textContent = taskDescription; 
    deleteButton.textContent = 'Delete'; 

    //o botao de delete vai excluir o item
    deleteButton.addEventListener('click', function() {
        tasklist.removeChild(listItem);
    });

    //adiciona o elemento ao item da lista
    listItem.appendChild(doneTask);
    listItem.appendChild(taskText);
    listItem.appendChild(deleteButton);
    
    //adiciona a data se for informada
    if(dueDateValue !== null){
        const dueDate = document.createElement('p');
        dueDateValue.textContent = dueDateValue;
        listItem.appendChild(dueDate);
    }

    //adiciona a tarefa na lista
    tasklist.appendChild(listItem);

    //reseta os inputs
    taskInput.value = '';
    DueDateInput.value = '';
};

function LoginScreen(){
    
};

function ChangeColoMode(){
    
};



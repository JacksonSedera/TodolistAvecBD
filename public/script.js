const taskForm = document.getElementById('task-form');
const taskTable = document.getElementById('task-table').getElementsByTagName('tbody')[0];

function loadTasks() {
    fetch('/taches')
        .then(response => response.json())
        .then(tasks => {
            taskTable.innerHTML = '';
            tasks.forEach(task => {
                const row = taskTable.insertRow();
                row.innerHTML = `
                    <td>${task.nom}</td>
                    <td>${task.prenom}</td>
                    <td>${task.date}</td>
                    <td>${task.heure}</td>
                    <td>${task.produit}</td>
                    <td>
                        <button onclick="editTask(${task.id})">Modifier</button>
                        <button onclick="deleteTask(${task.id})">Supprimer</button>
                    </td>
                `;
            });
        });
}

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const date = document.getElementById('date').value;
    const heure = document.getElementById('heure').value;
    const produit = document.getElementById('produit').value;
    fetch('/taches', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `nom=${nom}&prenom=${prenom}&date=${date}&heure=${heure}&produit=${produit}`
    }).then(() => {
        loadTasks();
        taskForm.reset();
    });
});

function editTask(id) {
    const nom = prompt('Nouveau nom :');
    const prenom = prompt('Nouveau prénom :');
    const date = prompt('Nouvelle date :');
    const heure = prompt('Nouvelle heure :');
    const produit = prompt('Nouveau produit :');
    fetch(`/taches/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `nom=${nom}&prenom=${prenom}&date=${date}&heure=${heure}&produit=${produit}`
    }).then(() => loadTasks());
}

function deleteTask(id) {
    fetch(`/taches/${id}`, {
        method: 'DELETE'
    }).then(() => loadTasks());
}

loadTasks();
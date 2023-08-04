function getUsers() {
    const usersJSON = localStorage.getItem('users');
    return usersJSON ? JSON.parse(usersJSON) : [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function displayUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    const users = getUsers();

    users.forEach((user, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
      ${user.name} 
      <button class="viewBtn" data-id="${index}">View</button>
      <button class="editBtn" data-id="${index}">Edit</button>
      <button class="removeBtn" data-id="${index}">Remove</button>
    `;
        userList.appendChild(listItem);
    });
}

// Функція для відображення деталей користувача
function displayUserDetails(index) {
    const users = getUsers();
    const user = users[index];
    const userDetails = document.getElementById('userDetails');

    userDetails.innerHTML = `
    <h2>Details</h2>
    <p><strong>Ім'я:</strong> ${user.name}</p>
    <p><strong>Email:</strong> ${user.email}</p>   
  `;
}


function displayEditForm(index) {
    const users = getUsers();
    const user = users[index];
    const userDetails = document.getElementById('userDetails');

    userDetails.innerHTML = `
    <h2>Редагування користувача</h2>
    <label for="editName">Ім'я:</label>
    <input type="text" id="editName" value="${user.name}" required>
    <label for="editEmail">Email:</label>
    <input type="email" id="editEmail" value="${user.email}" required>
    <button class="saveBtn" data-id="${index}">Save</button>
  `;
}


function removeUser(index) {
    if (confirm('Are you sure you want to delete the user?')) {
        const users = getUsers();
        users.splice(index, 1);
        saveUsers(users);
        displayUsers();
        const userDetails = document.getElementById('userDetails');
        userDetails.innerHTML = '';
    }
}


document.getElementById('addUserForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (name && email) {
        const newUser = { name, email };
        const users = getUsers();
        users.push(newUser);
        saveUsers(users);
        displayUsers();
        document.getElementById('addUserForm').reset();
    }
});

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('viewBtn')) {
        const index = event.target.getAttribute('data-id');
        displayUserDetails(index);
    } else if (event.target.classList.contains('editBtn')) {
        const index = event.target.getAttribute('data-id');
        displayEditForm(index);
    } else if (event.target.classList.contains('removeBtn')) {
        const index = event.target.getAttribute('data-id');
        removeUser(index);
    } else if (event.target.classList.contains('saveBtn')) {
        const index = event.target.getAttribute('data-id');
        const newName = document.getElementById('editName').value;
        const newEmail = document.getElementById('editEmail').value;

        if (newName && newEmail) {
            const users = getUsers();
            users[index].name = newName;
            users[index].email = newEmail;
            saveUsers(users);
            displayUsers();
            const userDetails = document.getElementById('userDetails');
            userDetails.innerHTML = '';
        }
    }
});

displayUsers();

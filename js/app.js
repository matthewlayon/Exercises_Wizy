// Variables for adding
const fnameInput = document.getElementById("fname-input");
const lnameInput = document.getElementById("lname-input");
const roleInput = document.getElementById("role-input");
const emailInput = document.getElementById("email-input");
const addBtn = document.getElementById("add-btn");
const tableBody = document.getElementById("table-body");

//variable for updating users
const updateFnameInput = document.getElementById("update-fname-input");
const updateLnameInput = document.getElementById("update-lname-input");
const updateEmailInput = document.getElementById("update-email-input");
const updateRoleInput = document.getElementById("update-role-input");
const updateBtn = document.getElementById("update-btn");
const cancelBtn = document.getElementById("cancel-btn");
//storing user input in local storage 
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUserId = null;

//for checking email
const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Functions

//for the view function 
function renderTable() {
  tableBody.innerHTML = "";
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const tr = document.createElement("tr");
    const idTd = document.createElement("td");
    const fnameTd = document.createElement("td");
    const lnameTd = document.createElement("td");
    const emailTd = document.createElement("td");
    const roleTd = document.createElement("td");
    const actionsTd = document.createElement("td");
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    idTd.innerText = user.id;
    fnameTd.innerText = user.fname;
    lnameTd.innerText = user.lname;
    emailTd.innerText = user.email;
    roleTd.innerText = user.role;
    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";
    editBtn.addEventListener("click", () => {
      showUpdateForm(user.id);
    });
    deleteBtn.addEventListener("click", () => {
      deleteUser(user.id);
    });
    actionsTd.appendChild(editBtn);
    actionsTd.appendChild(deleteBtn);
    tr.appendChild(idTd);
    tr.appendChild(fnameTd);
    tr.appendChild(lnameTd);
    tr.appendChild(emailTd);
    tr.appendChild(roleTd);
    tr.appendChild(actionsTd);
    tableBody.appendChild(tr);
  }
}


//adding users
function addUser() {
  const fname = fnameInput.value.trim();
  const lname = lnameInput.value.trim();
  const email = emailInput.value.trim();
  const role = roleInput.value.trim();

  if(email.match(validRegex)){
    if(fname && email != null){
      var id = 1;
      var val = users.map(function(x){return x.id; }).indexOf(id);
      while(val != -1){
	    id++;
	    val = users.map(function(x){return x.id; }).indexOf(id);
  }
      const user = {
        id: id,
        fname: fname,
        lname: lname,
        email: email,
        role: role,
      };

      //pushing user, storing user and view the user in the table
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      fnameInput.value = "";
      lnameInput.value = "";
      emailInput.value = "";
      roleInput.value = "";
      renderTable();
    }else{
      alert("Name is Required");
    }
  }else{
    alert("Invalid email address!");
  }
}

//deleting users
function deleteUser(userId) {
  users = users.filter((user) => user.id !== userId);
  localStorage.setItem("users", JSON.stringify(users));
  if (users.length == 0){
    hideUpdateForm();
  };
  renderTable();
}


function updateUser() {
  const fname = updateFnameInput.value;
  const lname = updateLnameInput.value;
  const email = updateEmailInput.value;
  const role = updateRoleInput.value;

  if(email.match(validRegex)){
    const index = users.findIndex((user) => user.id === currentUserId);
    if (index !== -1) {
      users[index].fname = fname;
      users[index].lname = lname;
      users[index].email = email;
      users[index].role = role;
      localStorage.setItem("users", JSON.stringify(users));
      hideUpdateForm();
      renderTable();
    }
  }else{
    alert("Invalid email address!");
  }
}

//for when you click the edit button the text boxes for updating will show up 

function showUpdateForm(userId) {
  const user = users.find((user) => user.id === userId);
  if (user) {
    updateFnameInput.value = user.fname;
    updateLnameInput.value = user.lname;
    updateEmailInput.value = user.email;
    updateRoleInput.value = user.role;
    currentUserId = user.id;
    updateBtn.addEventListener("click", updateUser);
    cancelBtn.addEventListener("click", hideUpdateForm);
    updateBtn.style.display = "inline-block";
    cancelBtn.style.display = "inline-block";
    updateFnameInput.style.display = "inline-block";
    updateLnameInput.style.display = "inline-block";
    updateEmailInput.style.display = "inline-block";
    updateRoleInput.style.display = "inline-block";
    document.getElementById("update-container").style.display = "block";
  }
}

//once entered the text boxes will be hidden (para mas nice tignan)
function hideUpdateForm() {
  updateFnameInput.value = "";
  updateLnameInput.value = "";
  updateEmailInput.value = "";
  updateRoleInput.value = "";
  currentUserId = null;
  updateBtn.removeEventListener("click", updateUser);
  cancelBtn.removeEventListener("click", hideUpdateForm);
  updateBtn.style.display = "none";
  cancelBtn.style.display = "none";
  updateFnameInput.style.display = "none";
  updateLnameInput.style.display = "none";
  updateEmailInput.style.display = "none";
  updateRoleInput.style.display = "none";
  document.getElementById("update-container").style.display = "none";
}

// Event Listeners
addBtn.addEventListener("click", addUser);

// Initialize table
renderTable();
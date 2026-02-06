const taskName = document.getElementById('taskName');
const taskDate = document.getElementById('taskDate');
const addBtn = document.getElementById('addBtn');
const body = document.getElementById('todoBody');
const filter = document.getElementById('filter');

let todos = JSON.parse(localStorage.getItem('todos') || '[]');

function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function render(list = todos) {
  body.innerHTML = '';

  list.forEach((t, i) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${t.name}</td>
      <td>${t.date}</td>
      <td>
        <button class="action-btn" onclick="editTask(${i})">Edit</button>
        <button class="action-btn" onclick="deleteTask(${i})">Delete</button>
      </td>`;

    body.appendChild(tr);
  });
}

addBtn.onclick = () => {
  if (!taskName.value || !taskDate.value) return;

  todos.push({ name: taskName.value, date: taskDate.value });
  taskName.value = '';
  taskDate.value = '';

  save();
  render();
};

function deleteTask(i) {
  todos.splice(i, 1);
  save();
  render();
}

function editTask(i) {
  const t = todos[i];
  const newName = prompt('Edit kegiatan:', t.name);
  const newDate = prompt('Edit tanggal:', t.date);

  if (newName && newDate) {
    todos[i] = { name: newName, date: newDate };
    save();
    render();
  }
}

filter.oninput = () => {
  const val = filter.value.toLowerCase();
  const filtered = todos.filter(t =>
    t.name.toLowerCase().includes(val)
  );
  render(filtered);
};

render();
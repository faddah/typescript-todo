/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

// import confetti from 'canvas-confetti';
import { v4 as uuidv4 } from 'uuid';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

// confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
//   resize: true,
//   useWorker: true,
// })({ particleCount: 200, spread: 200 });

console.log(uuidv4());
console.log(`Runnin' dat TypeScript, y'awll!`); 

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.querySelector<HTMLFormElement>('#new-task-form');
const input = document.querySelector<HTMLInputElement>('#new-task-title');
const button = document.querySelector<HTMLButtonElement>('button');

const addListItem = (task: Task): void => {
  const li: HTMLLIElement | null = document.createElement('li');
  const label: HTMLLabelElement = document.createElement('label');
  const checkbox: HTMLInputElement = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  label.append(checkbox, task.title);
  li.append(label);
  list?.append(li);
}

const saveTasks: Function = (): void => localStorage.setItem('TASKS', JSON.stringify(tasks));
const loadTasks: Function = (): Task[] => localStorage.getItem('TASKS') === null 
  ? [] 
  : JSON.parse(localStorage.getItem('TASKS') as string);

const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

form?.addEventListener('submit', e => {
  e.preventDefault();
  if (input?.value == '' || input?.value == null) return;

  const newTask = {
    id: uuidv4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  }
  addListItem(newTask);
  tasks.push(newTask);
  saveTasks();


  input.value = '';
});


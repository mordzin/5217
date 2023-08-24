interface Task {
	id: string;
	title: string;
	done: boolean;
	content: string;
}

// 🍍 Store
export const useTasks = defineStore("Tasks", () => {
	// ✨ Refs
	const tasks = ref([] as Array<Task>);
	const newTask = ref({ id: ``, title: ``, content: ``, done: false } as Task);
	const curTask = ref(null as Task | null);

	// 💻 Computeds
	const todo = computed(() => tasks.value.filter((task: any) => !task.done));
	const done = computed(() => tasks.value.filter((task: any) => task.done));

	// 🚀 Actions
	const setCurTask = (task: Task) => {
		curTask.value = task;
	};
	const createNewTask = () => {
		tasks.value.push({ ...getCopy(newTask.value), id: uuid() });
		resetNewTask();
	};
	const resetNewTask = () => {
		newTask.value = { id: ``, title: ``, content: ``, done: false };
	};

	// 🏹 Returns
	return {
		tasks,
		newTask,
		curTask,
		todo,
		done,
		createNewTask,
		resetNewTask,
		setCurTask,
	};
});

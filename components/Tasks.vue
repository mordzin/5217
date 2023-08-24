<template>
	<grid class="gaic h100 jcc fixed left wfit p6 z2">
		<List class="tasks wfit">
			<div v-for="task in tasks" :key="task.id">
				<Task v-bind="{ task }" />
			</div>
			<div class="new__task grid jcs">
				<Icon :icon="`add`" class="p1" />
				<Field
					:data="newTask"
					:prop="`title`"
					class="p2 wfit"
					:placeholder="`New Task`"
					@action="createNewTask()"
				/>
			</div>
		</List>
	</grid>
</template>

<script setup>
// Stores 🍍
const { tasks, newTask } = storeToRefs(useTasks());

const { createNewTask } = useTasks();
</script>

<style lang="sass" scoped></style>

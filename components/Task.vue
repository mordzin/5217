<template>
	<grid class="task jcs" @click="setCurTask(task)">
		<Icon
			:icon="!task.done ? `radio_button_unchecked` : `task_alt`"
			@click="task.done = !task.done"
			class="p1"
		/>
		<Field :data="task" :prop="`title`" class="p0 wfit" />
	</grid>
</template>

<script setup>
// 👉 Props
const props = defineProps({ task: Object });

const { setCurTask } = useTasks();
</script>

<style lang="sass" scoped></style>

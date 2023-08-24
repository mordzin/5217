<template>
	<div class="task__content grid jic gfr" v-if="curTask">
		<h1 class="tc">
			{{ curTask.title }}
		</h1>
		<div class="x4 tl">
			<p>
				{{ curTask.content }}
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
				consequuntur quibusdam quo qui dolor ratione ab nemo aut distinctio ea?
				Est laborum repellendus obcaecati temporibus quia repellat odio quis
				explicabo.
			</p>
		</div>
	</div>
</template>

<script setup>
// Stores 🍍
const { curTask } = storeToRefs(useTasks());
</script>

<style lang="sass" scoped>
.task__content
	position: absolute
	bottom: calc(-5rem - 92px)
	padding-bottom: 5rem
h1
	font-size: 5rem
	font-weight: 600
	margin: 0 0 1rem 0
</style>

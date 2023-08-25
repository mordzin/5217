<template>
	<grid class="task__content jic" v-if="curTask">
		<div class="task__details tc">
			<h1>
				{{ curTask.title }}
			</h1>
			<p class="pt2">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quam
				ullam ex corporis, porro temporibus, dolor asperiores iste deleniti
				perferendis aliquam possimus. Vitae quibusdam, illo iure eveniet beatae
				voluptatem totam!
			</p>

			<p class="pt2">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quam
				ullam ex corporis, porro temporibus, dolor asperiores iste deleniti
				perferendis aliquam possimus. Vitae quibusdam, illo iure eveniet beatae
				voluptatem totam!
			</p>

			<p class="pt2">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quam
				ullam ex corporis, porro temporibus, dolor asperiores iste deleniti
				perferendis aliquam possimus. Vitae quibusdam, illo iure eveniet beatae
				voluptatem totam!
			</p>
		</div>
	</grid>
</template>

<script setup>
// Stores 🍍
const { curTask } = storeToRefs(useTasks());
</script>

<style lang="sass" scoped>
.task__content
	margin-top: -25%
.task__content > div
	width: clamp(320px, 100%, 640px)

.task__details
</style>

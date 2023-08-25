<template>
	<div class="timer__page">
		<Tasks />
		<Timer class="sticky top" />
		<TaskContent />
	</div>
</template>

<script setup></script>

<style lang="sass">
.timer__page
	height: 100%
	max-height: 100vh
	overflow: scroll
</style>

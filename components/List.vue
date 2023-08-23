<template>
	<div class="list">
		<slot />
	</div>
</template>

<script setup></script>

<style lang="sass">
.list
	> *:not(:last-child)
		margin-bottom: var(--3)
</style>

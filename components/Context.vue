<template>
	<div class="context">
		<Overlay @click="toggle()" v-if="active" />

		<Button :icon="`more_vert`" @click="toggle()" />

		<Card
			:class="position"
			class="context__options dark style b4 p2"
			v-if="active"
		>
			<List>
				<div v-for="action in actions">
					<Button
						:name="action.name"
						:icon="action.icon"
						:class="action.style"
						@click="action.click()"
					/>
				</div>
			</List>
		</Card>
	</div>
</template>

<script setup>
// 👉 Props
const props = defineProps({ actions: Array, position: String });

// ✨ Render
const { active, toggle } = useToggle(false);
</script>

<style lang="sass">
.context__options
	z-index: 2
	width: 280px
	min-width: fit-content
	position: absolute
</style>

<template>
	<button :class="`${style} style hover`">
		<p v-if="name">{{ name }}</p>
		<Icon v-bind="{ icon, loading }" v-if="icon" />
		<Tooltip v-bind="{ tooltip }" v-if="tooltip" />
	</button>
</template>

<script setup>
const props = defineProps({
	name: String,
	icon: String,
	tooltip: String,
	loading: Boolean,
});

// TODO: Fix / Improve
// Style
const style = `grid jcsb gaic g3 ${useAttrs().class ?? ``} ${
	!props.name || !props.icon ? `` : `gtc--1-min`
}`;
</script>

<style lang="sass" scoped></style>

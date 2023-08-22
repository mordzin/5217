<template>
	<div class="icon">
		<Loading v-if="loading" />
		<i :class="isEmoji(icon) ? `emoji` : `material-icons-outlined`" v-else>
			{{ icon }}
		</i>
	</div>
</template>

<script setup>
// 👉 Props
const props = defineProps({
	icon: {
		type: String,
		default: `arrow_forward`,
	},
	loading: {
		type: Boolean,
		default: false,
	},
});
</script>

<style lang="sass">
.icon
  width: fit-content
  height: fit-content
  cursor: pointer

.material-icons-outlined, .material-icons
  font-family: 'Material Icons Outlined'
  font-weight: normal
  font-style: normal
  font-size: var(--3)
  display: inline-block
  line-height: 1
  text-transform: none
  letter-spacing: normal
  word-wrap: normal
  white-space: nowrap
  direction: ltr

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased

  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale

  /* Support for IE. */
  font-feature-settings: 'liga'


.emoji
  font: icon
  font-size: var(--3)
  width: var(--3)
  height: var(--3)
  line-height: var(--3)
  font-style: normal
</style>

<template>
	<div class="image">
		<img v-bind="{ src: src ?? thumbnail, alt }" />
	</div>
</template>

<script setup>
// 👉 Props
const props = defineProps({ src: String, alt: String });

const thumbnail =
	"https://firebasestorage.googleapis.com/v0/b/linkfood-v1.appspot.com/o/images%2Fthumbnail?alt=media&token=d22c857c-7944-43ea-b8e1-77dec1b2c1a0";
</script>

<style lang="sass" scoped>
.image, img
	width: 100%
	height: 100%
	overflow: hidden
img
	object-fit: cover
	object-position: 50% 50%
</style>

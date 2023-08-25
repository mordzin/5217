<template>
	<grid
		class="timer gaic jic gaic h100 w100"
		@click="toggleTimer()"
		:class="{ blur: useTasks().curTask }"
	>
		<svg viewBox="0 0 320 320" :class="time.isPaused ? 'isPaused' : ''">
			<text
				class="timer__numbers"
				x="160"
				y="160"
				fill="#fff"
				dominant-baseline="central"
				text-anchor="middle"
			>
				{{ currentTime }}
			</text>

			<ellipse
				ry="148"
				rx="148"
				id="progress__circle"
				cy="160"
				cx="160"
				fill="none"
				stroke="#00000020"
				stroke-width="24"
			/>
			<ellipse
				ry="148"
				rx="148"
				id="progress__circle"
				cy="160"
				cx="160"
				fill="none"
				stroke-width="24"
				stroke="#ffffff20"
				:stroke-dasharray="920"
				style="transform: rotate(-90deg) translate(-320px)"
				:stroke-dashoffset="progress"
			/>
		</svg>
	</grid>
</template>

<script setup>
const time = reactive({
	now: 0,
	total: 4140000,
	work: 3120000,
	break: 1020000,
	isPaused: true,
	timerInterval: null,
});

const currentTime = computed(() => {
	const elapsed = time.total - time.now;
	const seconds = formatTime(`${Math.floor((elapsed % 60000) / 1000)}`);
	const minutes = formatTime(`${Math.floor(elapsed / 60000)}`);
	return `${minutes}:${seconds}`;
});

const progress = computed(() => {
	const remaining = time.total - time.now;
	return 920 - (remaining / time.total) * 920;
});

const toggleTimer = () => {
	time.isPaused = !time.isPaused;
	if (time.isPaused) clearInterval(time.timerInterval);
	else time.timerInterval = setInterval(() => (time.now += 1000), 1000);
};
</script>

<style lang="sass" scoped>
.timer
	z-index: -1
	svg
		width: clamp(320px, 100%, 480px)
		text
			font-size: 4rem

.blur
	filter: blur(var(--8))
</style>

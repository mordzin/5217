<template>
	<grid class="timer" @click="toggleTimer()">
		<svg viewBox="0 0 360 360" :class="time.isPaused ? 'isPaused' : ''">
			<text class="timer__numbers" x="60" y="188" dominant-baseline="central">
				{{ time.minutes }}
				<tspan class="seconds" opacity="0.50">
					{{
						time.seconds < 10
							? String(time.seconds).padStart(2, 0)
							: time.seconds
					}}
				</tspan>
			</text>
			<circle r="180" cx="180" cy="180"></circle>
			<circle
				r="180"
				cx="180"
				cy="180"
				:stroke-dasharray="1111"
				:stroke-dashoffset="
					(1111 / 3540) * (time.minutes * 60 + time.seconds) * -1
				"
			></circle>
		</svg>
	</grid>
</template>

<script setup>
const time = reactive({
	work: 52,
	break: 17,
	seconds: 0,
	minutes: 59,
	isPaused: true,
	timerInterval: null,
});

const progress = computed(() => {
	// # Calc dasharray and dashoffset by time
	const total = time.work + time.break;
	const dasharray = 1121;
	const dashoffset = 1118;
	const dasharrayWork = (dasharray * time.work) / total;
	const dasharrayBreak = (dasharray * time.break) / total;
	const dashoffsetWork = (dashoffset * time.work) / total;
	return {
		dasharrayWork,
		dasharrayBreak,
		dashoffsetWork,
	};
});

const toggleTimer = () => {
	time.isPaused = !time.isPaused;

	if (time.isPaused) {
		clearInterval(time.timerInterval);
	} else {
		time.timerInterval = setInterval(() => {
			if (time.seconds === 0) {
				if (time.minutes === 0) clearInterval(time.timerInterval);
				time.minutes--;
				time.seconds = 59;
			} else {
				time.seconds--;
			}
		}, 1000);
	}
};
</script>

<style lang="sass" scoped>
.timer
	width: 400px
	svg
		width: fit-content
		height: fit-content
		overflow: visible
		circle
			fill: none
			outline-offset: -12px
			stroke: #fff
			stroke-opacity: 0.33
			stroke-location: inside
			stroke-width: 24px
			transform: rotate(-90deg)
			transform-origin: center
			transition: stroke-dashoffset 1s linear
		.timer__numbers
			font-size: 7rem
			fill: #ffffff
			tspan
				font-size: 4rem
</style>

<template>
	<div
		class="app dark"
		@click="toggleTimer()"
		@mousedown="handleMouseDown"
		@mouseup="handleMouseUp"
	>
		<!-- Main -->
		<div class="content">
			<div class="timer">
				<svg width="100%" height="100%" viewBox="0 0 100 100">
					<circle
						:class="{
							isRunning: isRunning,
							isPaused: isPaused,
						}"
						class="progress-circle-foreground"
						cx="50"
						cy="50"
						r="46"
						:stroke-dasharray="dashArray"
						:stroke-dashoffset="dashOffset"
					/>
					<text
						class="time"
						x="50"
						y="50"
						text-anchor="middle"
						dominant-baseline="central"
					>
						{{ minutes }}
						<tspan class="seconds" opacity="0.5">{{ seconds }}</tspan>
					</text>
				</svg>
			</div>
			<input v-model="taskName" class="task-input" placeholder="Tarefa" />
			<p style="opacity: 0.2">
				Long press to start / reset. Press to pause / play
			</p>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";

const isRunning = ref(false);
const isPaused = ref(false);
const time = ref(3540000); // 59 minutos em milissegundos
const taskName = ref("");
const cycleDuration = 3120000; // 52 minutos em milissegundos
const breakDuration = 1020000; // 17 minutos em milissegundos
const maxDuration = cycleDuration + breakDuration;
const dashArray = ref(328); // Comprimento inicial do contorno do círculo
const dashOffset = ref(0); // Deslocamento para o contorno do círculo
const timerInterval = ref(null);
const longPressTimer = ref(null);

const minutes = computed(() => parseInt((maxDuration - 600000) / 60000));
const seconds = computed(() =>
	((time.value % 60000) / 1000).toFixed(0).toString().padStart(2, "0")
);

const updateProgressBar = () => {
	dashOffset.value =
		(dashArray.value * (maxDuration - time.value)) / maxDuration;
};

const handleMouseDown = () => {
	longPressTimer.value = setTimeout(() => {
		isRunning.value = false;
		isPaused.value = false;
		time.value = maxDuration;
		clearInterval(timerInterval.value);
		updateProgressBar();
	}, 500);
};

const handleMouseUp = () => clearTimeout(longPressTimer.value);

const toggleTimer = () => {
	if (time.value === maxDuration || time.value === 0) {
		time.value = maxDuration; // Restaurar o tempo
		isRunning.value = true;
		isPaused.value = false;
		startTimer();
	} else if (isRunning.value && !isPaused.value) {
		isPaused.value = true;
		isRunning.value = false;
		clearInterval(timerInterval.value);
	} else if (isPaused.value) {
		isPaused.value = false;
		isRunning.value = true;
		startTimer();
	}
};

const startTimer = () => {
	const interval = 1000;
	timerInterval.value = setInterval(() => {
		time.value = Math.max(time.value - interval, 0); // Garantir que o tempo não fique negativo
		if (time.value <= 0) {
			clearInterval(timerInterval.value);
			toggleTimer();
		}
	}, interval);
};

onMounted(() => updateProgressBar());

watch(time, () => updateProgressBar());
</script>

<style>
* {
	padding: 0;
	margin: 0;
	color: #fff;
}
.app.dark {
	min-height: 100vh;
	width: 100%;
	max-height: 100vh;
	max-width: 100vw;
	background-color: #222;
	font-family: Arial, sans-serif;
	display: grid;
	place-items: center;
	overflow: hidden;
	transition: all 1s ease-in-out;
}

.content {
	display: grid;
	grid-template-columns: 1fr;
	justify-items: center;
	grid-auto-flow: row;
	cursor: pointer;
	gap: 3rem;
	min-width: -webkit-fill-available;
}

.timer {
	display: grid;
	width: 320px;
	height: 320px;
	align-self: center;
}

.task-input {
	font-size: 8rem;
	text-align: center;
	font-weight: bold;
	width: min-content;
	border: none;
	outline: none;
	background-color: transparent;
}
.progress-circle-foreground {
	fill: none;
	stroke-width: 6;
	stroke: #ffffff16;
	stroke-linecap: round;
	transform: rotate(-90deg);
	transform-origin: center;
	transition: stroke-dashoffset 1s linear;
}
.isRunning {
	stroke: #00cc66;
}

.isPaused {
	stroke: #cc0000; /* Green for work time */
}

.time {
	font-size: 2rem;
	font-weight: bold;
	fill: #ffffff;
}

.seconds {
	font-size: 1rem;
	opacity: 0.5;
}
</style>

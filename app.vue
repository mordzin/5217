<template>
	<div class="app p3 h100 grid gaic">
		<grid style="grid-template-columns: 1fr 4fr 1fr">
			<List>
				<grid
					class="g2"
					style="grid-template-columns: min-content 1fr"
					v-for="task in tasks"
					:key="task.id"
				>
					<Icon
						:icon="!task.done ? `radio_button_unchecked` : `task_alt`"
						@click="task.done = !task.done"
						class="p1"
					/>
					<Field :data="task" :prop="`name`" class="p0" />
				</grid>
				<grid class="g2" style="grid-template-columns: min-content 1fr">
					<Field
						:data="newTask"
						:prop="`name`"
						class="p2"
						:placeholder="`New Task`"
						@action="createNewTask()"
					/>
				</grid>
			</List>

			<grid class="hmin grid gaic jcc jic gfr g5">
				<div
					:style="{
						width: `320px`,
						height: `320px`,
					}"
				>
					<div class="timer" @click="toggleTimer()">
						<svg viewBox="0 0 360 360" :class="time.isPaused ? 'isPaused' : ''">
							<text
								class="timer__numbers"
								x="60"
								y="188"
								dominant-baseline="central"
							>
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
					</div>
				</div>
				<div>
					<!-- <h1 placeholder="Nome da Tarefa" class="bgn">{{ newTask.name }}</h1> -->
					<!-- Futuramente, Link da Tarefa -->
					<p style="opacity: 0.2">
						Long press to start / reset. Press to pause / play
					</p>
				</div>
			</grid>
		</grid>
	</div>
</template>

<script setup>
const tasks = reactive([]);
const newTask = ref({
	id: 0,
	name: ``,
});

const createNewTask = () => {
	tasks.push(getCopy(newTask.value));
	newTask.value = {
		id: uuid(),
		name: ``,
		done: false,
	};
};

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

<style lang="sass">
*
	color: #fff
	cursor: pointer
.timer
	width: clamp(200px, 100%, 480px)
	svg
		width: fit-content
		height: fit-content
		overflow: visible
		circle
			fill: none
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

export default defineNuxtConfig({
	app: {
		head: {
			charset: "utf-16",
			viewport: "width=device-width, initial-scale=1",
			title: "The 5217",
			meta: [
				{
					name: "description",
					content:
						"5217 is a productivity method: 52 min working, 17 min break. Boosts focus and efficiency.",
				},
			],
			link: [
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/icon?family=Material+Icons+Outlined",
				},
			],
		},
	},
	vue: {
		compilerOptions: {
			isCustomElement: (tag: string) => ["grid", "content"].includes(tag),
		},
	},
	modules: [["@pinia/nuxt", { autoImports: ["defineStore", "storeToRefs"] }]],
	css: ["@/assets/sass/style.sass"],
	nitro: { preset: "firebase" },
	typescript: { shim: false },
	ssr: false,
});

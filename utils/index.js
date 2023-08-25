import { customAlphabet } from "nanoid";

export const getCopy = (data) => {
	if (!data) return null;
	return JSON.parse(JSON.stringify(data));
};

export const isOdd = (num) => {
	return num % 2 !== 0;
};

export const is = (data, arr) => {
	return arr.includes(data.type) || arr.includes(data.collection);
};

export const getSelecteds = (arr) => {
	return arr.filter((data) => data.amount);
};

export const minData = (data) => {
	const { path, name, type } = data;
	return { path, name, type, amount: 0 };
};

export const mountPage = (type) => {
	const data = Array.from(useData().data.values());
	const page = data.find((data) => data.type === type);
	page.catalogs = page.content
		.filter((c) => c.type !== "productCatalog")
		.map(({ path }) => {
			const catalog = useData().get(path);
			catalog.colls = catalog.content
				.filter((c) => c.type !== "pizzaSizes")
				.map(({ path }) => {
					if (!catalog) return;
					const coll = useData().get(path);
					coll.items = coll.content.map(({ path }) => {
						const item = useData().get(path);
						return item;
					});
					return coll;
				});
			return catalog;
		});
	return page;
};

export const getCatalogs = (arr) => {
	return arr.filter((data) => is(data, ["catalog"]));
};

export const formatTime = (time) => time.toString().padStart(2, "0");

export const uuid = (size) => {
	// Data
	const alphabet =
		"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	// 🏹 Returns
	return customAlphabet(alphabet, size || 6)();
};

export const getElementHeigth = (elementID) => {
	const element = document.getElementById(elementID);
	return element?.getBoundingClientRect().height;
};

export const isEmoji = (str) => {
	if (!str) return false;
	const unicode = str.codePointAt(0).toString(16);
	return unicode.includes("1f");
};

export const imageResize = (file, size) => {
	const dataURItoBlob = (dataURI) => {
		const bytes =
			dataURI.split(",")[0].indexOf("base64") >= 0
				? atob(dataURI.split(",")[1])
				: unescape(dataURI.split(",")[1]);
		const mime = dataURI.split(",")[0].split(":")[1].split(";")[0];
		const max = bytes.length;
		const ia = new Uint8Array(max);
		for (let i = 0; i < max; i += 1) ia[i] = bytes.charCodeAt(i);
		return new Blob([ia], { type: mime });
	};
	const reader = new FileReader();
	const image = new Image();
	const canvas = document.createElement("canvas");
	const resize = () => {
		let width = image.width;
		let height = image.height;
		if (width > height) {
			if (width > size) {
				height *= size / width;
				width = size;
			}
		} else {
			if (height > size) {
				width *= size / height;
				height = size;
			}
		}
		canvas.width = width;
		canvas.height = height;
		canvas.getContext("2d").drawImage(image, 0, 0, width, height);
		let dataURL = canvas.toDataURL("image/jpeg");
		return dataURItoBlob(dataURL);
	};
	return new Promise((ok, no) => {
		if (!file.type.match(/image.*/)) {
			no(new Error("Not an image"));
			return;
		}
		reader.onload = (readerEvent) => {
			image.onload = () => ok(resize());
			image.src = readerEvent.target.result;
		};
		reader.readAsDataURL(file);
	});
};

export const childsOf = (arr, parent) => {
	return arr.filter((data) => data.parent.path === parent.path);
};

export const mapFrom = (arr) => {
	return new Map(Object.entries(arr || []));
};
export const arrFrom = (map) => {
	return Array.from(map.values());
};

export const goTo = (path) => {
	const slash = path[0] === `/`;
	useRouter().push(slash ? path : `/${path}`);
};

export const slugify = (str) => {
	return String(str)
		.replace(`.jpg`, ``)
		.replace(`.jpeg`, ``)
		.replace(`.png`, ``)
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9 -]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
};

export const html = {
	get: (id) => document.getElementById(id),
};

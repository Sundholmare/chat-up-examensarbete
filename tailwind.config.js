module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"main-peach": "#EF7E77",
				"off-white": "#EFEFEF",
				"sent-blue": "#78A7EF",
				"recieved-peach": "#FF8080",
				"chat-grey": "#E7E7E7",
				darkest: "#232735",
				darker: "#2B2F3F",
				dark: "#373B51",
				"light-dark": "#40445C",
				overlay: "rgba(0, 0, 0, 0.5)",
			},
			width: {
				"9/10": "90%",
				extendedText: "32rem",
			},
			height: {
				imageHeight: "35rem",
			},
		},
	},
	plugins: [],
};

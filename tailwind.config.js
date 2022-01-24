module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"main-peach": "#EF7E77",
				"off-white": "#EFEFEF",
				"sent-blue": "#78C4EF",
				"recieved-peach": "#FE9595",
				"chat-grey": "#E7E7E7",
				overlay: 'rgba(0, 0, 0, 0.5)',
			},
			width: {
				"9/10": "90%",
				'extendedText' : '32rem'
			},
			height: {
				'imageHeight': '35rem'
			}
		},
	},
	plugins: [],
};

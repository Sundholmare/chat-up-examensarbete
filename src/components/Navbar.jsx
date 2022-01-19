const Navbar = ({ children }) => {
	return (
		<div>
			<div className="flex items-center px-5 bg-red-500 nav-height">
				<h1>Logo</h1>
			</div>

			{children}
		</div>
	);
};

export default Navbar;

const Navbar = ({ children }) => {
	return (
		<div className="flex items-center h-20 px-5 bg-red-500">
			<h1>Logo</h1>
			{children}
		</div>
	);
};

export default Navbar;

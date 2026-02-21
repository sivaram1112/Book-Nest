const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white py-6 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <p>&copy; {currentYear} BookNest. All Rights Reserved.</p>
                <p className="text-sm text-gray-400 mt-2">Where Stories Nestle.</p>
            </div>
        </footer>
    );
};

export default Footer;

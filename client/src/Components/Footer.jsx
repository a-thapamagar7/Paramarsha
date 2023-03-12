import param2 from "../Images/param2.png";

const Footer = () => {
    return ( 
        <footer className="bg-gray-800 text-white py-8 mt-32 lato">
            <div className="container mx-auto px-4">
                <div className="md:flex justify-between">
                <div className="md:w-1/4 mb-8 md:mb-0">
                    <img className="h-10" src={param2} alt="Logo" />
                    <p className="text-gray-400 mt-4 w-4/5 text-justify">With our professional advice and extensive tools, find the ideal bachelor program, college, and university in Nepal. Make a well-informed choice to ensure your future academic and professional success. Welcome to our website "Paramarsha".</p>
                </div>
                <div className="md:w-1/4 mb-8 md:mb-0">
                    <h3 className="text-lg font-bold mb-4">Links</h3>
                    <ul>
                    <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                    </ul>
                </div>
                <div className="md:w-1/4 mb-8 md:mb-0">
                    <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                    <p className="text-gray-400">Kamal Marg</p>
                    <p className="text-gray-400">Kamal Pokhari</p>
                    <p className="text-gray-400 mt-4">(+977) 98-4444-444</p>
                </div>
                <div className="md:w-1/4">
                    <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                    <div className="flex items-center">
                    <a href="#" className="text-gray-400 hover:text-white mr-4">a</a>
                    <a href="#" className="text-gray-400 hover:text-white mr-4">b</a>
                    <a href="#" className="text-gray-400 hover:text-white mr-4">c</a>
                    <a href="#" className="text-gray-400 hover:text-white">d</a>
                    </div>
                </div>
                </div>
            </div>
        </footer>
    );
}
 
export default Footer;
import { Github, Twitter, Linkedin } from "lucide-react";

const Navbar = () => {
    return (
        <div className="z-10 flex justify-between items-center px-2.5 pt-4 lg:px-10 w-full h-auto text-white lg:pb-2">
            <div>
                <h1 className="text-xl lg:text-3xl md:text-2xl sm:text-xl font-mono font-black ">
                    INTELLEX
                </h1>
            </div>
            <div className="flex lg:w-40 w-35 justify-between">
                <div className="hover:scale-115 hover:text-[#4F8CFF] duration-200 ">
                    <a href="https://github.com/harshalpatil2809" target="_blank">
                        <Github />
                    </a>
                </div>
                <div className="hover:scale-115 hover:text-[#4F8CFF] duration-200">
                    <a href="https://x.com/Patil_Harshal_5" target="_blank">
                        <Twitter />
                    </a>
                </div>
                <div className="hover:scale-115 hover:text-[#4F8CFF] duration-200">
                    <a href="https://www.linkedin.com/in/harshal-patil-56a0b2293/" target="_blank">
                        <Linkedin />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
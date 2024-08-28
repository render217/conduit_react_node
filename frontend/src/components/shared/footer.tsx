export default function Footer() {
    return (
        <footer className="py-3 bg-clrHarp mt-5">
            <div className="">
                <div className="max-w-[1200px] mx-auto px-10 h-full flex gap-4">
                    <div className="flex items-center w-full gap-4 max-sm:flex-col max-sm:gap-1 max-sm:text-center">
                        <h2 className="text-lg text-clrTurtleGreen font-semibold font-titilliumWeb">
                            conduit
                        </h2>
                        <p className="text-xs font-light">
                            An interactive learning project from Thinkster. Code
                            & design licensed under MIT.
                        </p>
                        <p className="sm:ml-auto px-2 max-sm:text-center text-xs max-sm:mt-2 font-semibold ">
                            Developed by Beamlak
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default function Footer() {
    return (
        <footer>
            <div className="h-[40px]"></div>
            <div className="h-[60px] bg-clrHarp ">
                <div className="max-w-[1200px] mx-auto px-10 h-full flex gap-4">
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg text-clrTurtleGreen font-semibold font-titilliumWeb">
                            conduit
                        </h2>
                        <p className="text-xs font-light">
                            An interactive learning project from Thinkster. Code
                            & design licensed under MIT.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

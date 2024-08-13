export default function Banner() {
    return (
        <div className="h-[200px] bg-clrTurtleGreen  shadow-md shadow-slate-200">
            <div className="max-w-[1200px] mx-auto w-full px-10 h-full grid">
                <div className="flex flex-col gap-2 text-center justify-center">
                    <h1 className="text-5xl font-titilliumWeb font-bold text-white">
                        conduit
                    </h1>
                    <p className="font-light text-2xl text-white ">
                        A place to share your knowledge
                    </p>
                </div>
            </div>
        </div>
    );
}

const title = 'Invitaciones Digitales'

const MainTitle = () => {

    const words = title.split(' ');
    return (
        <div class="px-4 sm:px-6 text-center">
            <div class="press-start-2p-regular font-bold">
                <h1 class="text-shadow-lg/30 text-4xl sm:text-5xl md:text-6xl xl:text-8xl -translate-x-2 md:-translate-x-5 xl:-translate-x-3">
                    {words.map((word, i) => (
                        <span key={i} class="block">{word}</span>
                    ))}
                </h1>
            </div>

        </div>
    );
};

export default MainTitle;
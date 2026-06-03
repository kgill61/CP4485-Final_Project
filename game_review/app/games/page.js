import "./games.css"
import Image from "next/image"

export default function GamesPage() {
    return (
     /*Responsive web design using Tailwind*/
    <div className="games-page bg-gray-400 sm:text-3xl md:text-4xl lg:text-5xl">
        <h1>Games page (Need to add forms)</h1>
            <Image src="/skyrim-special-edition.jpg" alt="Skyrim photo" width={700} height={1}/>

    </div>
    )
}
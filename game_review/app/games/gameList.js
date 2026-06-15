// list all games and their info here, that way we can send that object to the gameDisplay page to fill it out when being displayed. 
// Need to figure out a way to send that object, maybe using the database later?
import Card from "./gameCards"

const gameList = [
    {id: 1, title: "The Elder Scrolls 5: Skyrim", Description: "So good it's been remade like 20 times...", image:"/skyrim-special-edition.jpg"},
    {id: 2, title: "The Legend of Zelda: Breath of the Wild", Description: "Which timeline is this one in again?", image: ""
    }
]

function CardList() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl mt-8">
            {gameList.map((item) => (
                <Card 
                    key={item.id}
                    title={item.title}
                    Description={item.Description}
                    image={item.image}
                />
            ))}
        </div>
    )
}

export default CardList;
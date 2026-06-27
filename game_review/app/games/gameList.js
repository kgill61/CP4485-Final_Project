// List all games and their info here, that way we can send that object to the gameDisplay page to fill it out when being displayed. 
import Card from "./gameCards";

function CardList({ games }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl mt-8">
      {games.map((item) => (
        <Card
          key={item._id}
          title={item.title}
          id={item.id}
          description={item.description}
          image={item.image}
        />
      ))}
    </div>
  );
}

export default CardList;
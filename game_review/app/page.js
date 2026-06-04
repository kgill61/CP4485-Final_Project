export default function Home() {
  const pageContainers = {
    textAlign: 'center',
    backgroundColor: "gray",
    flex: 1,
    padding: '20px',
    margin: '1px',
    borderRadius: '8px'
  }

  return (
    /*Responsive web design using Tailwind*/
    <div className="sm:text-2xl md:text-3xl lg:text-4xl">
      <div>
        {/* this is the section for that carousel I want to add, or at least a header. */}
      </div>
      {/*This is the section for our home page, one section for a bunch of random/popular games , one for a random game to look at? */}
      <div style={{display: "flex", width: '100vw'}}>
        <div style={pageContainers}>
          <h1>|| What's hot ||</h1>
            <p>Games that are popular</p>
        </div>
        <div style={pageContainers}>
          <h1>|| Random ||</h1>
            <p>Random assortment of games you might like!</p>
        </div>
      </div>
    </div>
  );
}

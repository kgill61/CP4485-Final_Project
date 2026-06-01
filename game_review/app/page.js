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
    <body>
      <div>
        {/* this is the section for that carousel I want to add, or at least a header. */}
      </div>
      {/*This is the section for our home page, one section for a bunch of random/popular games , one for a random game to look at? */}
      <div style={{display: "flex", width: '100vw'}}>
        <div style={pageContainers}>
          <h1>Portion 1</h1>
            <p>This is the first portion</p>
        </div>
        <div style={pageContainers}>
          <h1>Portion 2</h1>
            <p>This is the second portion</p>
        </div>
      </div>
    </body>
  );
}

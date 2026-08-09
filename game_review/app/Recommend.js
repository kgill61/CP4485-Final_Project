'use client'
export default function Recommend() {

    async function getRec() {
        // Make a call to the AI route
        // Display with tailwind css correctly with returned data (UseStates?)
        
        console.log("Getting Recommendations...")

        try {
            const res = await fetch("http://localhost:3000/api/airec", {
                method: "POST",
                cache: "no-store",
            });

            console.log(res)

            if (!res.ok) {
                console.error("API error:", res.status);
                return [];
            }
            return await res.json();
        } catch (err) {
            console.error("Fetch failed:", err);
            return [];
        }
    }

    return (
        <button onClick={getRec}>Get Recommendations</button>

        // Some components stuff here to display responses, map over each of the responded games from the AI (Look at games page for what I mean)
    )
}
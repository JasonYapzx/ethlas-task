import { useEffect, useState } from "react";

export default function LoadingScreen() {
    const [faded, setFaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
        setFaded(true);
        }, 4000);
    }, []);
    return (
        <div
        className={`absolute z-30 h-screen w-full bg-black  place-items-center transition-all duration-1000 ${
          faded ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
            <div className="starwars-demo">
                <img src="//cssanimation.rocks/demo/starwars/images/star.svg" alt="Star" className="star" />
                <img src="//cssanimation.rocks/demo/starwars/images/wars.svg" alt="Wars" className="wars" />
                <h2 className="byline" id="byline">The Force Awakens</h2>
            </div>
        </div>
    )
}
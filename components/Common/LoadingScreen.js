import { useEffect, useState } from "react";
import Image from 'next/future/image'
import star from "../../public/images/star.svg";
import wars from "../../public/images/wars.svg";


export default function LoadingScreen() {
    const [faded, setFaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
        setFaded(true);
        }, 5000);
    }, []);
    return (
        <div
        className={`absolute z-30 h-screen w-full bg-black  place-items-center transition-all duration-1000 ${
          faded ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
            <div className="starwars-demo">
                <Image src={star} alt="Star" className="star" />
                <Image src={wars} alt="Wars" className="wars" />
                <h2 className="byline" id="byline">The Force Awakens</h2>
            </div>
        </div>
    )
}
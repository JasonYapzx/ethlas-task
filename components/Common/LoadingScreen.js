import { useEffect, useState } from "react";
import Image from 'next/future/image'
import star from "../../public/images/star.svg";
import wars from "../../public/images/wars.svg";


export default function LoadingScreen() {
    const [faded, setFaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
        setFaded(true);
        }, 7000);
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
                <h2 className="byline" id="byline">
                    <span className="spin-letters">T</span>
                    <span className="spin-letters">h</span>
                    <span className="spin-letters">e</span>
                    <span className="spin-letters">&nbsp;</span>
                    <span className="spin-letters">&nbsp;</span>
                    <span className="spin-letters">F</span>
                    <span className="spin-letters">o</span>
                    <span className="spin-letters">r</span>
                    <span className="spin-letters">c</span>
                    <span className="spin-letters">e</span>
                    <span className="spin-letters">&nbsp;</span>
                    <span className="spin-letters">&nbsp;</span>
                    <span className="spin-letters">A</span>
                    <span className="spin-letters">w</span>
                    <span className="spin-letters">a</span>
                    <span className="spin-letters">k</span>
                    <span className="spin-letters">e</span>
                    <span className="spin-letters">n</span>
                    <span className="spin-letters">s</span>
                </h2>
            </div>
        </div>
    )
}
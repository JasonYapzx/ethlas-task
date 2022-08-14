import { useState } from 'react';
import questions from '../../public/questions.json';

export default function Answer({options, curr, handle, selectedOptions}) {

    const [ choices, setChoices ] = useState([{ 0: '4' }, { 1: '4' }, { 2: '4' }]);

    return (
    <div className="flex flex-col w-full">
        {options[curr]?.map((answer, index) => (
        <div
            key={index}
            className={`flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/10 rounded-xl ${choices[curr] == index ? "bg-white/30" : "bg-white/5" }`}
            onClick={(e) => { 
                handle(answer);  
                setChoices(prevState => {
                    let newState = [...prevState];
                    newState[curr] = index;
                    return newState;
                });
            }}
        >
            <input
                type="radio"
                name={answer.name || answer.title}
                value={answer.name || answer.title}
                checked={
                    choices[curr] === index
                }
                onChange={(e) => handle(answer)}
                className="w-6 h-6 bg-black"
            />
            <p className="ml-6 text-white">{answer.name || answer.title}</p>
        </div>
        ))}
    </div>
    )
}
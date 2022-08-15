import { useEffect, useState } from 'react';

import Loading from '../Common/Loading';
import Answer from './Answer';
import questions from '../../public/questions.json';


import { useRouter } from 'next/router';
import { PrismaClient } from '@prisma/client';

export default function Question({options}) {
    const [ currentQuestion, setCurrentQuestion ] = useState(0); // Question Navigation
    const [ selectedOptions, setSelectedOptions ] = useState([]); // States to store the options selection
    const router = useRouter();

    /* For navigation between questions */
    const handlePrevious = () => {
        const prevQues = currentQuestion - 1;
        prevQues >= 0 && setCurrentQuestion(prevQues);
    };

    const handleNext = () => {
        const nextQues = currentQuestion + 1;
        nextQues < questions.length && setCurrentQuestion(nextQues);
    }

    /* Updating the states of options selected */
    const handleAnswerOption = (answer) => {
        setSelectedOptions([
            (selectedOptions[currentQuestion] = {answerByUser: answer}),
        ]);
        setSelectedOptions([...selectedOptions]);
    }

    /* Submission of quiz */
    const handleSubmitButton = async () => {
        // check no options selected
        if (selectedOptions.length != 3) {
            alert("Please complete all questions first!")
        } else {
            // allPeople[] - 2d array of all possible people from the 3 choices made
            const allPeople = selectedOptions.map(x => {
                return x.answerByuser?.residents || x.answerByUser?.people || x.answerByUser?.characters;
            })

            // people[] - flattened allPeople array
            const people = allPeople.reduce((acc, currVal) => {
                    return acc?.concat(currVal);
            }, []).filter(x => x !== undefined);

            // personId for querying
            const person = people[Math.floor(Math.random()*people.length)];
            const personId = person.replace("https://swapi.dev/api/people/", '').slice(0, -1);

            const response = await fetch('/api/persons', {
                method: 'PUT',
                body: personId
            })

            router.push({
                pathname: '/result',
                query: { person: person }
            }, '/result');
        }
    };

    return (
        <>
            <div className="flex flex-col px-5 py-5 rounded-lg bg-[#1A1A1A] justify-center items-center">
                <div className="flex flex-col items-start w-full">
                    <h4 className="mt-10 text-xl text-white/60">
                        Question {currentQuestion + 1} of {questions.length}
                    </h4>
                    <div className="mt-4 text-2xl text-white">
                        {questions[currentQuestion].question}
                    </div>
                </div>
                <Answer options={options} curr={currentQuestion} handle={handleAnswerOption} selectedOptions={selectedOptions}></Answer>
                <div className="flex justify-between w-full mt-4">
                    <button className="w-[49%] py-3 bg-yellow-600 hover:bg-yellow-400 rounded-lg text-white" onClick={handlePrevious}>Previous</button>
                    <button 
                        onClick={currentQuestion + 1 === questions.length ? handleSubmitButton : handleNext}
                        className={`w-[49%] py-3 rounded-lg ${currentQuestion + 1 === questions.length ? "bg-white text-black hover:bg-slate-300" : "bg-yellow-600 text-white hover:bg-yellow-400"}`}>
                            {currentQuestion + 1 === questions.length ? "Submit" : "Next"}
                    </button>
                </div>
            </div>
        </>
    )
}
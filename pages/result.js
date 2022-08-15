import { useEffect, useState } from 'react';

import Body from '../components/Common/Body';
import Loading from '../components/Common/Loading';
import NavBar from '../components/Common/NavBar';
import Person from '../components/Common/Person';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { getPerson } from './api/fetchChoices';

/**
 * 
 * @returns Result page after submitting the quiz
 */
export default function Result() {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ person, setPerson ] = useState();
    const router = useRouter();

    useEffect(() => {
        const person = router.query.person;
        setIsLoading(true);
        
        const fetchData = async () => {
            // ensures the results page would have a person on loading
            if (person === undefined) {
                router.push("/quiz");
            } else {
                let output = person.replace("https://swapi.dev/api/people/", '').slice(0, -1);
                let data = await getPerson(output);

                setPerson(data);
                setIsLoading(false);
            }
        }

        fetchData()
    }, [router.query]);

    return (
    <>
        <NavBar></NavBar>
        <Body className="flex flex-col items-center">
            { isLoading 
            ? <div className="flex flex-col px-5 py-5 h-[524px] w-full sm:w-1/2 rounded-lg bg-[#1A1A1A] justify-center items-center">
                <Loading />
              </div>
            : <Person person={person}></Person>
            }
            <div className='flex flex-row w-2/3 justify-evenly'>
                <h2 className='link link-underline link-underline-black max-w-fit'>
                    <Link href="/">Home</Link>
                </h2>
                <h2 className='link link-underline link-underline-black max-w-fit'>
                    <Link href="/quiz">Do another quiz</Link>
                </h2>
                <h2 className='link link-underline link-underline-black max-w-fit'>
                    <Link href="/stats">Check the stats</Link>
                </h2>
            </div>
        </Body>
    </>
    );
}
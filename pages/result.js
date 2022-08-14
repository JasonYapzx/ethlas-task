import { useEffect, useState } from 'react';
import Link from 'next/link';
import Body from '../components/Common/Body';
import Loading from '../components/Common/Loading';
import NavBar from '../components/Common/NavBar';
import { useRouter } from 'next/router';
import { getPerson } from './api/fetchChoices';
import Person from '../components/Common/Person';


export default function Result() {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ person, setPerson ] = useState();
    const router = useRouter();

    useEffect(() => {
        const person = router.query.person;
        setIsLoading(true);
        
        const fetchData = async () => {
            let output = person.replace("https://swapi.dev/api/people/", '').slice(0, -1);
            let data = await getPerson(output);

            setPerson(data);
            setIsLoading(false);
        }

        fetchData()
    }, [router.query]);

    console.log(person);

    return (
    <>
        <NavBar></NavBar>
        <Body className="flex flex-col items-center">
            { isLoading 
            ? <div className="flex flex-col px-5 py-5 h-[524px] rounded-lg bg-[#1A1A1A] justify-center items-center">
                <Loading />
              </div>
            : <Person person={person}></Person>
            }
            <div className='flex flex-row w-full justify-evenly'>
                <h2 className='link link-underline link-underline-black max-w-fit'>
                    <Link href="/">Home</Link>
                </h2>
                <h2 className='link link-underline link-underline-black max-w-fit'>
                    <Link href="/quiz">Do another quiz</Link>
                </h2>
            </div>
        </Body>
    </>
    );
}
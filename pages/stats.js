import { useEffect, useState } from 'react';

import Body from '../components/Common/Body';
import Loading from '../components/Common/Loading';
import NavBar from '../components/Common/NavBar';
import Person from '../components/Common/Person';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { getPerson } from './api/fetchChoices';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getStaticProps() {
    const people = await prisma.person.findMany();
    return {
        props: {
            initialPeople: people
        }
    }
}

/**
 * @param initialPeople All people in the database 
 * @returns Statistics page
 */
export default function Stats({ initialPeople }) {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ people, setPeople ] = useState([])
    const router = useRouter();


    useEffect(() => {
        setIsLoading(true);

        setPeople(initialPeople.sort((a, b) => a.count > b.count ? -1 : 1));

        setIsLoading(false);

    });

    return (
    <>
        <NavBar></NavBar>
        <Body className="flex flex-col items-center">
            <div className="text-center border-solid border-white border-4 rounded-2xl my-5">
                {initialPeople.map((data, index) => (
                    <p key={index} className={`mx-12 mt-2 ${index === 0 ? "text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-yellow-600" 
                                        : index === 1 ? "text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-600" 
                                        : index === 2 ? "text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-orange-900" 
                                        : "text-white"}`}>{index + 1}. {data.name}: {data.count} {data.count == 1 ? "person" : "people"}</p>
                ))}
            </div>
            <div className='flex flex-row w-full justify-evenly mb-5'>
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
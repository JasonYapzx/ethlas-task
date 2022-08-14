import { useEffect, useState } from 'react';
import Link from 'next/link';
import Body from '../components/Common/Body';
import NavBar from '../components/Common/NavBar';
import Question from '../components/Quiz/Question';
import { getPlanets, getSpecies, getFilms } from './api/fetchChoices';
import Loading from '../components/Common/Loading';

export default function Quiz() {
    const [ data, setData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    function generateAnswers(num) {
        let result = []
        while (result.length < 4) {
            var r = Math.floor(Math.random() * num) + 1;
            if(result.indexOf(r) === -1) result.push(r);
        }

        return result;
    }

    // hook to generate random answers for each question
    useEffect(() => {
        // array to store the total number of entries for each question available from the api
        setIsLoading(true);
        const numberOf = [60, 37, 6]
        const result = numberOf.map(generateAnswers);

        const fetchData = async() => {
            let data1 = await Promise.all(result[0].map(async x => {
                return await getPlanets(x);
            }))

            let data2 = await Promise.all(result[1].map(async x => {
                return await getSpecies(x);
            }))

            let data3 = await Promise.all(result[2].map(async x => {
                return await getFilms(x);
            }))

            setData([data1, data2, data3])
            setIsLoading(false);
        }

        fetchData();
    }, [])

    return (
    <>
        <NavBar></NavBar>
        <Body className="align-items justify-center text-center">
            {isLoading 
            ? <div className="flex flex-col px-5 py-5 h-[524px] rounded-lg bg-[#1A1A1A] justify-center items-center">
                <Loading />
            </div>
            : <Question options={data}></Question>}
            <h2>
                <Link href="/">Back to home</Link>
            </h2>
        </Body>
    </>
    );
}
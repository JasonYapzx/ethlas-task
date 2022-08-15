import { useEffect, useState } from 'react';
import placeholder from '../../public/images/placeholder.png';
import Image from 'next/image';

/**
 * 
 * @param person Person that is being loaded 
 * @returns Component displaying the person chosen
 */

export default function Person({ person }) {
    const [ imageError, setImageError ] = useState(false);
    useEffect(() => {
        if (person?.image === null) {
            setImageError(true);
        } else {
            setImageError(false);
        }
    }, [person])

    return (
        <div className="flex flex-col w-full sm:w-1/2 justify-center align-center py-20 gap-2 items-center sm:gap-8 group bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100">
            <div className="relative w-24 sm:w-64 md:w-72 flex-row flex">
                <Image
                    src={imageError ? placeholder : person?.image}
                    alt={person?.name}
                    height="300%"
                    width="300%"
                    className="object-cover rounded-xl transition-all cursor-pointer hover:scale-95"
                />
            </div>
            <div className='p-5'>
                <h1>Hello there,</h1>
                <h1 className='text-3xl text-orange-800'>{person?.name} !</h1>
                <br />
                <p className='text-orange-500'>
                    You are of height {person?.height}m and of weight {person?.mass}kg. You are a {person?.species}. 
                    You have {person?.hairColor} coloured hair and {person?.eyeColor} coloured Eyes. Thanks for playing again {person?.name}! 
                </p>

            </div>
        </div>
    )
}
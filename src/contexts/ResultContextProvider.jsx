import React, { createContext, useContext, useState } from 'react';


const ResultContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

export const ResultContextProvider = ( {children } ) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('JS')


    const getResults = async ( type ) => {
        setIsLoading(true);

        const res = await fetch(`${baseUrl}${type}`, {
            method: 'GET',
            headers: {
                'x-user-agent': 'desktop',
                'x-rapidapi-host': 'google-search3.p.rapidapi.com',
                'x-rapidapi-key': 'fdc90fe85fmsha87105137a5bd0fp1584cejsnd3ccc4b7db25'
            }
        })

        const data = await res.json();
        console.log(data)
        setResults(data);
        setIsLoading(false);
    }

    return (
        <ResultContext.Provider value = { { getResults, results, searchTerm, setSearchTerm, isLoading } }>
            { children }
        </ResultContext.Provider>
    )

};


export const useResultContext = () => useContext(ResultContext);

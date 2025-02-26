"use client";

import Image from "next/image";
import React, {useEffect} from "react";
import {CarCard, CustomFilter, Hero, SearchBar, ShowMore} from "@/components";
import {fetchCars} from "@/utils";
import {fuels, yearsOfProduction} from "@/constants";

export default function Home() {
    const [allCars, setAllCars] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const [manufacturer, setManufacturer] = React.useState('');
    const [model, setModel] = React.useState('');

    const [limit, setLimit] = React.useState(10);

    const [fuel, setFuel] = React.useState('');
    const [year, setYear] = React.useState(2022);

    const getCars = async () => {
        setLoading(true);
        try {
            const allCars = await fetchCars({
                manufacturer: manufacturer || '',
                year: year || 2022,
                fuel: fuel || '',
                limit: limit || 10,
                model: model || ''
            });

            setAllCars(allCars);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        getCars();
    }, [fuel, year, limit, manufacturer, model]);

    return (
        <main className="overflow-hidden">
            <Hero/>

            <div className='mt-12 padding-x padding-y max-width' id='discover'>
                <div className='home__text-container'>
                    <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
                </div>

                <div className='home__filters'>
                    <SearchBar setManufacturer={setManufacturer} setModel={setModel}/>

                    <div className='home__filter-container'>
                        <CustomFilter title='fuel' options={fuels} setFilter={setFuel}/>
                        <CustomFilter title='year' options={yearsOfProduction} setFilter={(value) => setYear(Number(value))}/>
                    </div>
                </div>

                {allCars.length > 0 ? (
                    <section>
                        <div className='home__cars-wrapper'>
                            {allCars?.map((car, index) => (
                                <CarCard key={index} car={car}/>
                            ))}
                        </div>
                        {
                            loading && (
                                <div className='mt-16 w-full flex-center'>
                                    <Image src='/loader.svg' alt='loader' width={50} height={50}
                                           className='object-contain'/>
                                </div>
                            )
                        }
                        <ShowMore
                            pageNumber={(limit || 10) / 10}
                            isNext={(limit) > allCars.length}
                            setLimit={setLimit}
                        />
                    </section>
                ) : (
                    <div className='home__error-container'>
                        <h2 className='text-black text-x1 text-bold'>Oops, no results</h2>
                        <p>{allCars?.message}</p>
                    </div>
                )}
            </div>
        </main>
    );
}

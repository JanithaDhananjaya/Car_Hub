"use client";

import {SearchManufacturer} from "@/components/index";
import React, {useState} from "react";
import Image from "next/image";

const SearchBar = ({setManufacturer, setModel}: { setManufacturer: (manufacturer: string) => void, setModel: (model: string) => void }) => {

    const [searchManufacturer, setSearchManufacturer] = useState('');
    const [searchModel, setSearchModel] = useState('');

    const SearchButton = ({otherClasses}: { otherClasses: string }) => {
        return (
            <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
                <Image
                    src='/magnifying-glass.svg'
                    alt='magnifying glass'
                    width={40}
                    height={40}
                    className='object-contain'
                />
            </button>
        )
    }
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (searchManufacturer === '' && searchModel === '') {
            return alert('Please fill in the search bar');
        }
        setManufacturer(searchManufacturer);
        setModel(searchModel);
    };

    return (
        <form className='searchbar' onSubmit={handleSearch}>
            {/*Search Manufacturer*/}
            <div className='searchbar__item'>
                <SearchManufacturer selected={searchManufacturer} setSelected={setSearchManufacturer}/>
                <SearchButton otherClasses='sm:hidden'/>
            </div>

            {/*Search Model*/}
            <div className='searchbar__item'>
                <Image src='/model-icon.png' alt='model icon' width={25} height={25}
                       className='absolute w-[20px] h-[20px] ml-4'/>
                <input type='text' name='model' value={searchModel} onChange={(e) => setSearchModel(e.target.value)}
                       placeholder='Tiguan' className='searchbar__input'/>
                <SearchButton otherClasses='sm:hidden'/>
            </div>
            <SearchButton otherClasses='max-sm:hidden'/>
        </form>
    )
};

export default SearchBar;
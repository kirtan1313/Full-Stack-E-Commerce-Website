import React, { useEffect } from "react";
import { CiDesktopMouse2 } from "react-icons/ci";
import { FaMouse } from "react-icons/fa";
import Title from "../Title";

const Banner = () => {
    return (
        <div className="relative w-full h-[600px] bg-white overflow-hidden mt-[58px]">
            <Title title="Home" />
            <div
                className="absolute top-0 left-0 w-full h-full bg-red-500"
                style={{
                    clipPath: "polygon(100% 0, 100% 58%, 0 100%, 0 0)",
                }}
            />

            <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 text-white">
                <p className="mt-2 text-lg sm:text-xl uppercase text-center">Well Come To Ecommerce</p>
                <h1 className="text-3xl sm:text-5xl font-bold text-center uppercase">Find Amazing products below</h1>
                <div className="flex justify-center w-[100%] pt-3 ">
                    <button className="cursor-pointer items-center mt-4 bg-white border border-transparent hover:border-white text-black hover:text-white hover:bg-red-500 font-semibold px-5 py-2 rounded shadow flex w-[100px] transition">
                        Scroll
                        <span className="ps-2"><FaMouse /></span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Banner;

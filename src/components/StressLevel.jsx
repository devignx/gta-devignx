import { useState } from "react";
import peassad from "../assets/peas-sad.png";
import peas from "../assets/peas.png";
import Tooltip from "../components/Tooltip";
export default function StressLevel() {
    const [
        level,
        // setLevel
    ] = useState("higher");
    const [
        stressPercent,
        // setStressPercent
    ] = useState(22);

    return (
        <div className="w-full md:w-[20rem] text-center text-2xl relative bg-white p-12 px-8 shad rounded-2xl">
            <div className="group absolute text-pri/50 top-3 right-3">
                <Tooltip text={"This is your Stress level"} />
            </div>
            <img
                className="mx-auto mb-4"
                src={level === "higher" ? peassad : peas}
                alt="peas"
            />
            <p>Your stress level is {level} than yesterday</p>
            <h2
                className={`text-6xl mt-5 font-bold ${
                    level === "higher" ? "text-redd" : "text-pri"
                }`}
            >
                {stressPercent}%
            </h2>
            <button className="bg-pri text-white px-6 py-3 rounded-full mt-8 text-base font-medium w-full">
                View in Detail
            </button>
        </div>
    );
}

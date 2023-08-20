import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip, //label hovering component
    Legend,
} from "recharts";
import useStore from "../store/store";

//customised dot for showing the stresslevel
const CustomizedDot = (props) => {
    const { cx, cy, value } = props;

    if (value < 50) {
        return (
            <svg
                x={cx - 10}
                y={cy - 10}
                width={20}
                height={20}
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M25.8797 49.7594C22.7438 49.7594 19.6386 49.1418 16.7413 47.9417C13.8441 46.7416 11.2116 44.9827 8.99421 42.7652C6.77677 40.5478 5.0178 37.9153 3.81774 35.0181C2.61767 32.1209 2 29.0156 2 25.8797C2 22.7438 2.61767 19.6386 3.81774 16.7413C5.0178 13.8441 6.77677 11.2116 8.99421 8.99421C11.2116 6.77677 13.8441 5.0178 16.7413 3.81773C19.6386 2.61767 22.7438 2 25.8797 2C32.213 2 38.2869 4.51589 42.7652 8.99421C47.2435 13.4725 49.7594 19.5464 49.7594 25.8797C49.7594 32.213 47.2435 38.2869 42.7652 42.7652C38.2869 47.2435 32.213 49.7594 25.8797 49.7594Z"
                    fill="#00D487"
                    stroke="#00D487"
                    strokeWidth="2.54717"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M20.5732 20.574C19.2465 17.9207 13.9399 17.9207 12.6133 20.574"
                    stroke="white"
                    strokeWidth="2.54717"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M39.1464 20.574C37.8198 17.9207 32.5132 17.9207 31.1865 20.574"
                    stroke="white"
                    strokeWidth="2.54717"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M32.5131 33.8379C31.6484 34.7204 30.6164 35.4215 29.4774 35.9001C28.3384 36.3787 27.1153 36.6252 25.8798 36.6252C24.6444 36.6252 23.4213 36.3787 22.2823 35.9001C21.1433 35.4215 20.1112 34.7204 19.2466 33.8379"
                    stroke="white"
                    strokeWidth="2.54717"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        );
    } else {
        return (
            <svg
                x={cx - 10}
                y={cy - 10}
                width={20}
                height={20}
                viewBox="0 0 51 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M25.3988 49.7594C22.2628 49.7594 19.1576 49.1418 16.2604 47.9417C13.3632 46.7416 10.7307 44.9827 8.51325 42.7652C6.29581 40.5478 4.53685 37.9153 3.33678 35.0181C2.13671 32.1209 1.51904 29.0156 1.51904 25.8797C1.51904 22.7438 2.13671 19.6386 3.33678 16.7413C4.53685 13.8441 6.29581 11.2116 8.51325 8.99421C10.7307 6.77677 13.3632 5.0178 16.2604 3.81773C19.1576 2.61767 22.2628 2 25.3988 2C31.7321 2 37.806 4.51589 42.2843 8.99421C46.7626 13.4725 49.2785 19.5464 49.2785 25.8797C49.2785 32.213 46.7626 38.2869 42.2843 42.7652C37.806 47.2435 31.7321 49.7594 25.3988 49.7594Z"
                    fill="#FF5E5E"
                    stroke="#FF5E5E"
                    strokeWidth="2.54717"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M19.0308 34.7949C19.8608 34.5261 20.8516 34.3125 21.945 34.1668C23.0385 34.021 24.2126 33.9459 25.3987 33.9459C26.5847 33.9459 27.7589 34.021 28.8523 34.1668C29.9458 34.3125 30.9365 34.5261 31.7666 34.7949"
                    stroke="white"
                    strokeWidth="2.54717"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M20.1982 21.1311C18.8715 23.7844 13.5649 23.7844 12.2383 21.1311"
                    stroke="white"
                    strokeWidth="2.54717"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M38.7719 21.1311C37.4453 23.7844 32.1387 23.7844 30.812 21.1311"
                    stroke="white"
                    strokeWidth="2.54717"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        );
    }
};
function CustomTooltip({ payload, label, active }) {
    if (active) {
        return (
            <div className="w-fit p-3 rounded-xl drop-shadow-lg bg-white text-black hover:cursor-pointer">
                <p className="label">{`${label} ${payload[0].value}%`}</p>
            </div>
        );
    }
}

export default function Linechart() {
    const { updateToken, identity, setIdentity, accessToken } = useStore(
        (state) => ({
            updateToken: state.updateToken,
            identity: state.identity,
            setIdentity: state.setIdentity,
            accessToken: state.accessToken,
        })
    );
    const [recs, setRecs] = useState([]);
    const [avgRecs, setAvgRecs] = useState([]);

    useEffect(() => {
        const calculateAverage = (numbers) => {
            if (numbers.length === 0) {
                return 0;
            }

            const sum = numbers.reduce((acc, num) => acc + num, 0);
            const average = sum / numbers.length;

            return average;
        };
        axios
            .get(`https://gta-alpha.vercel.app/recordings/summary`, {
                headers: {
                    Authorization: accessToken,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                setRecs([...response.data.result]);
                setAvgRecs(
                    calculateAverage(response.data.result[0].recordings)
                );
                console.log(avgRecs);
            })
            .catch(() => {
                console.log("error");
            });
    }, []);

    const data = [{ day: recs, avglevel: avgRecs }];

    const newdata = () => {
        const newdata = [];
        for (let i = 0; i < recs.length; i++) {
            newdata.push({ day: recs[i], avglevel: avgRecs });
        }
        return newdata;
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <LineChart
                width={600}
                height={400}
                data={newdata()}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
                <CartesianGrid className="bg-blue-300" strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis
                    tickFormatter={(tick) => {
                        return `${tick}%`;
                    }}
                    label={{
                        value: "Stress Level%",
                        angle: 270,
                        position: "insideLeft",
                    }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="avglevel"
                    stroke="blue"
                    dot={CustomizedDot} // svg
                />
            </LineChart>
        </div>
    );
}

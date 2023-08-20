import React, { useEffect, useState } from "react";
import MeditationTimer from "./MeditationTimer";
import useStore from "../../store/store";

const themes = [
    { name: "Starry Night", class: "starry" },
    { name: "Zen Garden", class: "zengarden" },
    { name: "Beach Meditation", class: "beach" },
    { name: "Forest Retreat", class: "forest" },
    { name: "Tibetan Singing Bowls", class: "tibet" },
];

const durations = [5, 10, 20, 30];

function MeditationApp() {
    useEffect(() => {
        console.log(theme);
    });
    const [selectedTheme, setSelectedTheme] = useState("");
    const [selectedDuration, setSelectedDuration] = useState(5);
    const [meditationStarted, setMeditationStarted] = useState(false);

    const { theme, setTheme } = useStore((state) => ({
        theme: state.theme,
        setTheme: state.setTheme,
    }));

    const handleThemeChange = (event) => {
        setSelectedTheme(event.target.value);
        setTheme(event.target.value);
    };

    const handleDurationChange = (event) => {
        setSelectedDuration(Number(event.target.value));
    };

    const handleStartMeditation = () => {
        setMeditationStarted(true);
    };

    const handleFinishMeditation = () => {
        setMeditationStarted(false);
    };

    if (meditationStarted) {
        return (
            <MeditationTimer
                theme={selectedTheme}
                duration={selectedDuration}
                onFinish={handleFinishMeditation}
            />
        );
    }

    return (
        <div className="p-12">
            <h1
                style={{ color: theme === "default" ? "black" : "white" }}
                className={`text-5xl text-white font-semibold mb-4`}
            >
                Choose your Vibe
            </h1>
            <select
                className={`px-6 py-5 w-full bg-transparent outline-none border-white md:w-4/6 block border mt-12 rounded-full mb-4`}
                onChange={handleThemeChange}
            >
                <option className="p-4 m-4 text-black" value="">
                    Select a theme
                </option>
                {themes.map((theme, index) => (
                    <option
                        key={index}
                        className="p-3 text-black"
                        value={theme.class}
                    >
                        {theme.name}
                    </option>
                ))}
            </select>
            <select
                className="px-6 py-5 w-full bg-transparent border-white md:w-4/6 block border mt-8 rounded-full mb-4"
                onChange={handleDurationChange}
            >
                {durations.map((duration, index) => (
                    <option key={index} value={duration}>
                        {duration} minutes
                    </option>
                ))}
            </select>
            <button
                className="bg-white w-full md:w-4/6 mt-8 text-black border  py-6 block px-4 rounded-full"
                onClick={handleStartMeditation}
            >
                Start Meditation
            </button>
        </div>
    );
}

export default MeditationApp;

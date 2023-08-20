import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import Usefade from "../components/UseFade";
import useStore from "../store/store";
import Feeling from "../components/Feeling";
import StressLevel from "../components/StressLevel";
import Linechart from "../components/LineChart";
import PostRecommendation from "../components/Postrecommendation";
import MeditationApp from "../components/meditation/MeditationApp";
import UserChart from "../components/UserChart";
import data from "../components/employee.json";
import smiley from "../assets/smiley.svg";
import { channel } from "diagnostics_channel";
import { choices } from "yargs";

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [choice, setChoice] = useState("meditation");
    const [renderedComp, setRenderedComp] = useState("userchart");
    const {
        // updateToken, identity, setIdentity,
        accessToken,
        theme,
    } = useStore((state) => ({
        updateToken: state.updateToken,
        identity: state.identity,
        setIdentity: state.setIdentity,
        accessToken: state.accessToken,
        theme: state.theme,
    }));

    return (
        <>
            {/* <Usefade isActive={accessToken === ""}>
                <RegisterForm />
            </Usefade> */}

            <Usefade isActive={true}>
                <div className="flex flex-wrap p-8 justify-between md:p-16">
                    <div className="flex w-full md:w-[50%] flex-wrap gap-6">
                        <Feeling />
                        <StressLevel />
                        <PostRecommendation />
                    </div>

                    <div
                        className={`w-full mt-12 md:mt-0 relative md:w-[45%] h-[80vh] p-8 pl-4 rounded-2xl ${
                            theme === "default" ? "bg-white" : theme
                        } `}
                    >
                        <button
                            onClick={() => setChoice(true)}
                            className="absolute shad-blu w-16 -bottom-8 centerh"
                        >
                            <img src={smiley} alt="smiley" />
                        </button>

                        {choice && (
                            <div className="flex flex-wrap gap-6 w-4/6 justify-center bg-white h-screen">
                                <button
                                    onClick={() => {
                                        setRenderedComp("zen");
                                        setChoice(false);
                                    }}
                                    className="px-6 py-5 shad-blu bg-white rounded-2xl"
                                >
                                    Zen Mode
                                </button>
                                <button
                                    onClick={() => {
                                        setRenderedComp("meditation");
                                        setChoice(false);
                                    }}
                                    className="px-6 py-5 shad-blu bg-white rounded-2xl"
                                >
                                    Mediatation
                                </button>
                                <button
                                    onClick={() => {
                                        {
                                            setRenderedComp("help");
                                            setChoice(false);
                                        }
                                    }}
                                    className="px-6 py-5 shad-blu bg-white rounded-2xl"
                                >
                                    Get Help
                                </button>
                                <button
                                    onClick={() => {
                                        setRenderedComp("journal");
                                        setChoice(false);
                                    }}
                                    className="px-6 py-5 shad-blu bg-white rounded-2xl"
                                >
                                    My Journal
                                </button>
                            </div>
                        )}

                        {renderedComp === "meditation" && <MeditationApp />}
                        {/* {renderedComp === "linechart" && <Linechart />} */}
                        {renderedComp === "userchart" && (
                            <UserChart employeeData={data.employees} />
                        )}
                    </div>
                </div>
            </Usefade>
        </>
    );
}

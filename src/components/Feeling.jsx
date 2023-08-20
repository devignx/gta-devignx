import peas from "../assets/peas.png";
import yes from "../assets/emojis/yes.svg";
import no from "../assets/emojis/no.svg";
import maybe from "../assets/emojis/maybe.svg";
import Tooltip from "../components/Tooltip";
import { TbInfoSquareRoundedFilled } from "react-icons/tb";

export default function Feeling() {
    return (
        <div className="min-w-[20rem] text-center text-2xl relative bg-white p-12 px-8 shad rounded-2xl">
            <div className="absolute text-pri/50 top-3 right-3">
                <Tooltip text={"This starts your assessment"} />
            </div>
            <img className="mx-auto mb-4" src={peas} alt="peas" />
            <p>How are you feelin' right now</p>
            <div className="flex gap-8 justify-center mt-8">
                <button>
                    <img src={yes} alt="yes" />
                </button>
                <button>
                    <img src={maybe} alt="yes" />
                </button>
                <button>
                    <img src={no} alt="yes" />
                </button>
            </div>
        </div>
    );
}

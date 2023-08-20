// import tip from "../assets/tip.svg";
import { TbInfoSquareRoundedFilled } from "react-icons/tb";

const Tooltip = ({ text }) => {
    return (
        <div className="group">
            <TbInfoSquareRoundedFilled />
            <div className="absolute pc toppppp bottom-0 centerh centerv">
                <div className="opacity-0 relative drop-shadow-lg scale-0 group-hover:scale-100 -translate-x-1/2 translate-y-0 group-hover:translate-y-5 anim group-hover:opacity-100">
                    <div className="gap-1 text-black flex relative px-4 py-2 justify-center items-center -mt-0.5 rounded-lg  bg-white w-fit whitespace-nowrap backdrop-blur-lg text-sm">
                        {text}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tooltip;

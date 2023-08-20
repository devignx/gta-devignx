import { Link } from "react-router-dom/dist";
import Tooltip from "./Tooltip";

export default function PostRecommendation() {
    const posts = [
        {
            name: "Love & War",
            link: "https://www.google.com",
        },
        {
            name: "Fire & Ice",
            link: "https://www.google.com",
        },
        {
            name: "Man & Dog",
            link: "https://www.google.com",
        },
        {
            name: "Blue & Purple",
            link: "https://www.google.com",
        },
    ];
    return (
        <div className="w-full md:w-[20rem] min-h-[25rem] text-center text-2xl relative bg-white p-12 px-8 shad rounded-2xl">
            <div className="absolute text-pri/50 top-3 right-3">
                <Tooltip text={"These will help you to make your day better"} />
            </div>
            <p>Here are some posts that you would love reading today</p>
            <div className="flex gap-4 text-lg mt-8 absolute left-0 px-6 overflow-x-scroll w-full first-letter:">
                {posts.map((post, index) => {
                    return (
                        <Link
                            key={index}
                            className="grad-warm relative h-24 min-w-[10rem] rounded-2xl hover:drop-shadow-xl anim-slo"
                            target="_blank"
                            to={post.link}
                        >
                            <h1 className=" absolute bottom-5 left-5 whitespace-nowrap">
                                {post.name}
                            </h1>
                        </Link>
                    );
                })}
            </div>
            <button className="bg-pri absolute bottom-12 centerh w-10/12 text-white px-6 py-3 rounded-full mt-8  text-base font-medium">
                View All
            </button>
        </div>
    );
}

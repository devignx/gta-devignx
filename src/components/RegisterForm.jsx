import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import hello from "../assets/hello.svg";
import Usefade from "./UseFade";
import axios from "axios";
import useStore from "../store/store";

const RegisterForm = () => {
    const [selectedDep, setSelectedDep] = useState({});
    const { updateToken, identity, setIdentity, accessToken } = useStore(
        (state) => ({
            updateToken: state.updateToken,
            identity: state.identity,
            setIdentity: state.setIdentity,
            accessToken: state.accessToken,
        })
    );

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        workTimings: "",
        gender: "",
        department: "",
    });

    const workTimingsOptions = [
        "9:00 AM - 5:00 PM",
        "10:00 AM - 6:00 PM",
        "Flexible",
        "Other",
    ];

    const departmentOptions = [
        "Engineering",
        "Marketing",
        "Sales",
        "Finance",
        "HR",
        "Other",
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(selectedDep);
        // // Handle form submission here
        // console.log("Form data:", formData);
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then((cred) => {
                console.log(cred.user.accessToken);
                axios
                    .post(
                        `https://gta-alpha.vercel.app/auth/signup`,
                        {
                            name: formData.name,
                            phone: formData.phone,
                            gender: formData.gender,
                            worktime: formData.workTimings,
                            dep_id: selectedDep.dep_id,
                        },
                        {
                            headers: {
                                Authorization: cred.user.accessToken,
                                "Content-Type": "application/json",
                            },
                        }
                    )
                    .then((response) => {
                        updateToken(
                            cred._tokenResponse.idToken,
                            cred._tokenResponse.refreshToken
                        );
                    })
                    .catch(() => {
                        return <h1>Error</h1>;
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
        ).then((cred) => {
            axios
                .get(`https://gta-alpha.vercel.app/auth/signin`, {
                    headers: {
                        Authorization: cred.user.accessToken,
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    console.log(response);
                    setIdentity(response.data.result[0]);
                    updateToken(
                        cred._tokenResponse.idToken,
                        cred._tokenResponse.refreshToken
                    );
                    console.log(cred._tokenResponse.idToken);
                    setIdentity(response.data.result[0]);
                })
                .catch(() => {
                    return <h1>Error</h1>;
                });
        });
    };

    const [depts, setDepts] = useState([]);

    useEffect(() => {
        axios
            .get(`https://gta-alpha.vercel.app/departments`)
            .then((response) => {
                setDepts([...response.data.result]);
            })
            .catch(() => {
                console.log("error");
            });
    }, []);

    return (
        <>
            <div className="flex flex-wrap lg:flex-nowrap w-full lg:overflow-y-hidden">
                <div className="flex w-full justify-center lg:overflow-y-hidden items-center">
                    <img
                        className="w-[15rem] mt-12 lg:mt-0 lg:w-[25rem]"
                        src={hello}
                        alt="hello"
                    />
                </div>
                <div className="lg:overflow-y-scroll mt-12 lg:mt-0 w-full md:w-1/2 mx-auto lg:w-2/4 lg:mr-0 lg:ml-auto h-screen ">
                    <div className="lg:bg-white w-full lg:min-h-screen px-8 py-12">
                        <h1 className="font-semibold text-sm text-center">
                            Enter your Details
                        </h1>

                        <Usefade isActive={!isLogin}>
                            <form onSubmit={handleSubmit}>
                                {/* ... other fields ... */}
                                <div className="my-6 mt-12">
                                    <input
                                        className="shadow appearance-none border rounded-2xl w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Full Name"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="my-6">
                                    <input
                                        className="shadow appearance-none border rounded-2xl w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Email Address"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="my-6">
                                    <input
                                        className="shadow appearance-none border rounded-2xl w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="my-6">
                                    <input
                                        className="shadow appearance-none border rounded-2xl w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        placeholder="Phone Number"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="my-6">
                                    <input
                                        className="shadow appearance-none border rounded-2xl w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="text"
                                        name="gender"
                                        id="gender"
                                        placeholder="Gender"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="my-6">
                                    <select
                                        className="shadow appearance-none border rounded-2xl w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        name="department"
                                        id="department"
                                        onChange={(e) =>
                                            setSelectedDep(
                                                JSON.parse(e.target.value)
                                            )
                                        }
                                    >
                                        <option value="">
                                            Select Department
                                        </option>
                                        {depts.map((option) => (
                                            <option
                                                key={option}
                                                value={JSON.stringify(option)}
                                            >
                                                {option.dep_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="my-6">
                                    <select
                                        className="shadow appearance-none border rounded-2xl w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        name="workTimings"
                                        id="workTimings"
                                        onChange={handleInputChange}
                                        value={formData.workTimings}
                                    >
                                        <option value="">
                                            Select Work Timings
                                        </option>
                                        {workTimingsOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    className="mx-auto text-white rounded-2xl px-6 py-4 w-full mt-4 bg-blue-950"
                                    type="submit"
                                >
                                    Register
                                </button>
                            </form>
                        </Usefade>

                        <Usefade isActive={isLogin}>
                            <form onSubmit={handleLogin}>
                                <div className="my-6">
                                    <input
                                        className="shadow appearance-none border rounded-2xl w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Email Address"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="my-6">
                                    <input
                                        className="shadow appearance-none border rounded-2xl w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <button
                                    onClick={handleLogin}
                                    className="mx-auto text-white rounded-2xl px-6 py-4 w-full mt-4 bg-blue-950"
                                    type="submit"
                                >
                                    Register
                                </button>
                            </form>
                        </Usefade>

                        <>
                            <Usefade isActive={isLogin}>
                                <div className="flex gap-2 font-semibold mt-8 text-center text-sm w-full justify-center">
                                    <p>New user?</p>
                                    <button
                                        onClick={() => setIsLogin(false)}
                                        className="underline text-bluee"
                                    >
                                        Register
                                    </button>
                                </div>
                            </Usefade>
                            <Usefade isActive={!isLogin}>
                                <div className="flex gap-2 font-semibold mt-8 text-center text-sm w-full justify-center">
                                    <p>Already a user?</p>
                                    <button
                                        onClick={() => setIsLogin(true)}
                                        className="underline text-bluee"
                                    >
                                        Login
                                    </button>
                                </div>
                            </Usefade>
                        </>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterForm;

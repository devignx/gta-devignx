import React from "react";

const ZenCards = ({ selectedCategory, randomTask }) => {
    return (
        <div className="mt-4">
            <div className="bg-white rounded-lg p-6 shadow-md w-96">
                <p className="text-gray-700">{randomTask}</p>
            </div>
        </div>
    );
};

export default ZenCards;

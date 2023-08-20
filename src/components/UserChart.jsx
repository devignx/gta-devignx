import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
const UserChart = ({ employeeData }) => {
    return (
        <div>
            {employeeData.map((employee, index) => (
                <div key={index}>
                    {/* <h2>{employee.name}</h2> */}
                    <LineChart
                        width={600}
                        height={400}
                        data={Object.values(employee.months)}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="absence_rate"
                            name="Absence Rate"
                            stroke="#8884d8"
                        />
                        <Line
                            type="monotone"
                            dataKey="project_completion_rate"
                            name="Project Completion Rate"
                            stroke="#82ca9d"
                        />
                        <Line
                            type="monotone"
                            dataKey="overtime_frequency"
                            name="Overtime Frequency"
                            stroke="#ffc658"
                        />
                    </LineChart>
                </div>
            ))}
        </div>
    );
};

export default UserChart;

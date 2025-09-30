"use client";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";


const data = [
{ day: "Mon", done: 2 },
{ day: "Tue", done: 3 },
{ day: "Wed", done: 1 },
{ day: "Thu", done: 4 },
{ day: "Fri", done: 5 },
{ day: "Sat", done: 2 },
{ day: "Sun", done: 3 },
];


export default function TaskCompletionChart() {
return (
<div className="h-64 w-full">
<ResponsiveContainer width="100%" height="100%">
<LineChart data={data}>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="day" />
<YAxis allowDecimals={false} />
<Tooltip />
<Line type="monotone" dataKey="done" strokeWidth={2} />
</LineChart>
</ResponsiveContainer>
</div>
);
}
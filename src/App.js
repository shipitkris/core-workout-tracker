import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card, CardContent } from "./components/ui/Card";
import { Button } from "./components/ui/Button";

const CoreWorkoutTracker = () => {
    const [workouts, setWorkouts] = useState([]);
    const [plank, setPlank] = useState(0);
    const [legRaises, setLegRaises] = useState(0);
    const [crunches, setCrunches] = useState(0);
    const [points, setPoints] = useState(0);

    useEffect(() => {
        const storedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
        setWorkouts(storedWorkouts);
        const storedPoints = JSON.parse(localStorage.getItem('points')) || 0;
        setPoints(storedPoints);
    }, []);

    const logWorkout = () => {
        const newWorkout = { date: new Date().toLocaleDateString(), plank, legRaises, crunches };
        const updatedWorkouts = [...workouts, newWorkout];
        setWorkouts(updatedWorkouts);
        localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));

        const earnedPoints = (plank / 10) + (legRaises / 5) + (crunches / 5);
        const newPoints = points + earnedPoints;
        setPoints(newPoints);
        localStorage.setItem('points', JSON.stringify(newPoints));
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Core Workout Tracker</h1>
            <Card className="p-4 mb-4">
                <CardContent>
                    <label className="block mb-2">Plank (seconds):</label>
                    <input type="number" value={plank} onChange={(e) => setPlank(e.target.value)} className="w-full p-2 mb-4 border rounded" />
                    
                    <label className="block mb-2">Leg Raises (Reps):</label>
                    <input type="number" value={legRaises} onChange={(e) => setLegRaises(e.target.value)} className="w-full p-2 mb-4 border rounded" />
                    
                    <label className="block mb-2">Crunches (Reps):</label>
                    <input type="number" value={crunches} onChange={(e) => setCrunches(e.target.value)} className="w-full p-2 mb-4 border rounded" />
                    
                    <Button onClick={logWorkout} className="w-full">Log Workout</Button>
                </CardContent>
            </Card>
            
            <Card className="p-4 mb-4">
                <CardContent>
                    <h2 className="text-lg font-semibold mb-2">Your Progress</h2>
                    <p>Points Earned: {points}</p>
                    <LineChart width={400} height={200} data={workouts} className="mt-4">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="plank" stroke="#8884d8" />
                        <Line type="monotone" dataKey="legRaises" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="crunches" stroke="#ffc658" />
                    </LineChart>
                </CardContent>
            </Card>
        </div>
    );
};

export default CoreWorkoutTracker;

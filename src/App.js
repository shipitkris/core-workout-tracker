import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Card, CardContent } from "./components/ui/Card";
import { Button } from "./components/ui/Button";

// 🔹 Import Firebase functions at the TOP (not inside a function)
import { db, collection, addDoc, getDocs, deleteDoc, doc } from "./firebase";

const CoreWorkoutTracker = () => {
    const [workouts, setWorkouts] = useState([]);
    const [plank, setPlank] = useState(0);
    const [legRaises, setLegRaises] = useState(0);
    const [crunches, setCrunches] = useState(0);
    const [points, setPoints] = useState(0);

    // 🔹 Load workouts from Firestore on page load
    useEffect(() => {
        loadWorkouts();
    }, []);

    const logWorkout = async () => {
        const newWorkout = { date: new Date().toLocaleDateString(), plank, legRaises, crunches };

        try {
            const docRef = await addDoc(collection(db, "workouts"), newWorkout);
            console.log("Workout saved to Firestore", docRef.id);

            // Refresh workouts from Firestore after saving
            loadWorkouts();
        } catch (error) {
            console.error("Error saving workout:", error);
        }
    };

    const loadWorkouts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "workouts"));
            const savedWorkouts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setWorkouts(savedWorkouts);
        } catch (error) {
            console.error("Error loading workouts:", error);
        }
    };

    const deleteWorkout = async (id) => {
        try {
            await deleteDoc(doc(db, "workouts", id));
            console.log("Workout deleted: ", id);
            loadWorkouts();
        } catch (error) {
            console.error("Error deleting workout:", error);
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Core Workout Tracker</h1>

            <Card>
                <CardContent>
                    <label className="block mb-2">Plank (seconds):</label>
                    <input type="number" value={plank} onChange={(e) => setPlank(e.target.value)} className="w-full p-2 mb-4 border rounded" />
                    
                    <label className="block mb-2">Leg Raises (Reps):</label>
                    <input type="number" value={legRaises} onChange={(e) => setLegRaises(e.target.value)} className="w-full p-2 mb-4 border rounded" />
                    
                    <label className="block mb-2">Crunches (Reps):</label>
                    <input type="number" value={crunches} onChange={(e) => setCrunches(e.target.value)} className="w-full p-2 mb-4 border rounded" />
                    
                    <Button onClick={logWorkout}>Log Workout</Button>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <h2 className="text-lg font-semibold mb-2">Your Progress</h2>
                    <p>Points Earned: {points}</p>

                    <LineChart width={400} height={200} data={workouts}>
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

            <Card>
                <CardContent>
                    <h2 className="text-lg font-semibold mb-2">Workout History</h2>
                    <ul>
                        {workouts.map((workout) => (
                            <li key={workout.id} className="flex justify-between items-center p-2 border-b">
                                {workout.date}: Plank {workout.plank}s, Leg Raises {workout.legRaises}, Crunches {workout.crunches}
                                <Button onClick={() => deleteWorkout(workout.id)}>Delete</Button>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};

export default CoreWorkoutTracker;

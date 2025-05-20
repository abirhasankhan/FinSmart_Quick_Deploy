import React, { useState } from "react";
import axios from "axios";

function App() {
	const [goal, setGoal] = useState("");
	const [amount, setAmount] = useState("");
	const [months, setMonths] = useState("");
	const [plan, setPlan] = useState(null);
	const [skill, setSkill] = useState("");
	const [jobs, setJobs] = useState([]);

	const calculatePlan = async () => {
		const res = await axios.post(
			"https://amplified-odd-passive.glitch.me",
			{
				goal,
				amount,
				months,
			}
		);
		setPlan(res.data);
	};

	const getJobs = async () => {
		const res = await axios.get(
			`http://localhost:3000/api/jobs?skill=${skill}`
		);
		setJobs(res.data);
	};

	return (
		<div className="p-6 max-w-xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">
				FinSmart - Save Smart, Grow Fast
			</h1>

			<input
				className="border p-2 w-full mb-2"
				placeholder="Goal (e.g., Buy a laptop)"
				onChange={(e) => setGoal(e.target.value)}
			/>
			<input
				className="border p-2 w-full mb-2"
				placeholder="Target Amount"
				type="number"
				onChange={(e) => setAmount(e.target.value)}
			/>
			<input
				className="border p-2 w-full mb-2"
				placeholder="Months"
				type="number"
				onChange={(e) => setMonths(e.target.value)}
			/>
			<button
				className="bg-blue-500 text-white px-4 py-2 mb-4"
				onClick={calculatePlan}
			>
				Generate Plan
			</button>

			{plan && (
				<div className="mb-4">
					<p>
						You need to save{" "}
						<strong>{plan.monthlySaving} BDT</strong> per month to
						reach your goal.
					</p>
				</div>
			)}

			<input
				className="border p-2 w-full mb-2"
				placeholder="Your Skill (e.g., Writing)"
				onChange={(e) => setSkill(e.target.value)}
			/>
			<button
				className="bg-green-500 text-white px-4 py-2 mb-4"
				onClick={getJobs}
			>
				Find Jobs
			</button>

			<ul className="list-disc pl-5">
				{jobs.map((job, index) => (
					<li key={index}>{job}</li>
				))}
			</ul>
		</div>
	);
}

export default App;

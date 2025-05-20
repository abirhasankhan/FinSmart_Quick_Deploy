import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();



const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/calculate', (req, res) => {
    const { amount, months } = req.body;
    const monthlySaving = (parseFloat(amount) / parseFloat(months)).toFixed(2);
    res.json({ monthlySaving });
});

app.get('/api/jobs', (req, res) => {
    const { skill } = req.query;

    const jobs = {
        writing: ["Freelance Article Writer", "Blog Editor", "Academic Assistant"],
        coding: ["Part-Time Web Developer", "Bug Fixer on Fiverr"],
        design: ["Logo Designer", "Canva Assistant"],
    };

    if (!skill) {
        return res.status(400).json({ error: "Missing 'skill' query parameter." });
    }

    const matchedJobs = jobs[skill.toLowerCase()] || ["No matches found"];
    res.json(matchedJobs);
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
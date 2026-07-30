import checkDatabase from "../services/health.service.js";

const healthCheck = async (req, res) => {
    try {
        await checkDatabase();

        res.status(200).json({
            status: "UP", database: "UP", timestamp: new Date().toISOString()
        });
    } catch (err) {
        res.status(503).json({
            status: "DOWN", database: "DOWN"
        });
    }
}

export default healthCheck;
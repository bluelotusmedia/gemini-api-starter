// Replace 'GEMINI_API_KEY' with your actual Gemini API key
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const {
	GoogleGenerativeAI,
	HarmBlockThreshold,
	HarmCategory,
} = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const generationConfig = {
	stopSequences: ["red"],
	maxOutputTokens: 100000,
	temperature: 0.9,
	topP: 0.1,
	topK: 16,
};

const safetySettings = [
	{
		category: HarmCategory.HARM_CATEGORY_HARASSMENT,
		threshold: HarmBlockThreshold.BLOCK_NONE,
	},
	{
		category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
		threshold: HarmBlockThreshold.BLOCK_NONE,
	},
	{
		category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
		threshold: HarmBlockThreshold.BLOCK_NONE,
	},
	{
		category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
		threshold: HarmBlockThreshold.BLOCK_NONE,
	},
];

async function run() {
	// For text-only input, use the gemini-pro model
	const model = genAI.getGenerativeModel({
		model: "gemini-1.5-pro",
		generationConfig,
		safetySettings,
	});

	const prompt = "Hello, Google?";

	console.log(prompt);

	const result = await model.generateContent(prompt);
	const response = await result.response;
	const text = response.text();
	console.log(text);
}

run();

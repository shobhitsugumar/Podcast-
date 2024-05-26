import * as dotenv from "dotenv";
import { CreateError } from "./errorController.js";
//import { OpenAI } from "openai";
//import Replicate from "replicate";
import { createProdia } from "prodia";

dotenv.config({ path: "./config.env" });

const prodia = createProdia({
  apiKey: process.env.PRODIA_API_TOKEN,
});

/*
const replicate = new Replicate();

export const generateImage = async (req, res, next) => {
  try {
    console.log("thisis request body ", req.body);
    const { prompt } = req.body;
    const response = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: { prompt },
      }
    );
    const generatedImage = response;

    return res.status(200).json({ photo: generatedImage });
  } catch (error) {
    next(
      CreateError(
        error.status,
        error?.response?.data?.error?.message || error?.message
      )
    );
  }
};
*/
export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    // Generate image with Prodia
    const job = await prodia.generate({ prompt });
    const { imageUrl } = await prodia.wait(job);

    // Check if the job is completed

    return res.status(200).json({ photo: imageUrl });
  } catch (error) {
    next(
      CreateError(
        error.status,
        error?.response?.data?.error?.message || error?.message
      )
    );
  }
};

import axios from "axios";

const Api = axios.create({
  baseURL: "https://createpixai.onrender.com/api/",
});

export const GetPosts = async () => await Api.get("/post/");
export const CreatePost = async (data) => await Api.post("/post/", data);
export const GenerateAIImage = async (data) =>
  await Api.post("/generateImage/", data);

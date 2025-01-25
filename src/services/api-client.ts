import axios from "axios";

export default axios.create({
  baseURL: "https://ws.audioscrobbler.com",
  params: {
    api_key: "fcd492e73eaf5db3fc46164916b00df9",
    format: "json",
  },
});

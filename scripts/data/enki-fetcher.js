import Axios from "axios";
import { ENKI_DATA_URL } from "./config.js";

export const FetchFullData = async () => (await Axios.post(ENKI_DATA_URL)).data;

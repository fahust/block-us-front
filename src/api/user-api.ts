import axios from "axios";
import Utils from "../helper/utils";
import { User } from "../interface/user.interface";

const axiosInstance = axios.create();

export async function getUser(utils: Utils): Promise<User | void> {
  const jwt = await utils.authentication();
  if (utils.accessJwt) {
    const { data } = await axiosInstance.get(`http://localhost:3000/user`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${jwt}`,
      },
    });
    return data;
  }
}

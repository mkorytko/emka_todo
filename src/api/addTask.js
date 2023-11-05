import { postData } from "./request";

export default async function addTask(body, params) {
    try {
        return await postData({
            mainUrl: "/api/user/addTask",
            body,
            params,
        });
    } catch (e) {
        throw new Error(e);
    }
}

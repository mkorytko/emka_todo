import { putData } from "./request";
import { callBackIsFn } from "../helpers";

export default async function updateTasks(body, callback) {
    try {
        const { payload } = await putData({
            mainUrl: "/api/admin/updateTask",
            body,
        });
        if (callBackIsFn(callback)) {
            callback();
        }
        return payload;
    } catch (e) {
        throw new Error(e);
    }
}

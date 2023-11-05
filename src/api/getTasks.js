import { getData } from "./request";

export default async function getTasks(params) {
    try {
        return await getData({
            mainUrl: "/api/user/getTasks",
            params,
        });
    } catch (e) {
        throw new Error(e);
    }
}

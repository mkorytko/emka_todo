import axios from "axios";
import { toast } from "react-toastify";
import {
    REQUEST_INTERNET_ERROR, REQUEST_SERVER_ERROR, REQUEST_UNKNOWN, REQUEST_UNKNOWN_ERROR,
} from "../constants";

function queryBuilder(params = {}) {
    if (
        typeof params !== "object"
        || params instanceof Array
        || Object.is(params, null)
        || Object.keys(params).length === 0
    ) {
        return "";
    }
    let query = Object.keys(params)
        .filter((key) => {
            const empty = params[key] === "";
            return !empty;
        });
    query = query.map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`);
    return `?${query.join("&")}`;
}

const methods = ["post", "put", "get", "delete"];

export function fetchData({
    url,
    method = "get",
    body = {},
}) {
    if (typeof url !== "string" || typeof method !== "string" || !methods.includes(method)) {
        console.warn({
            url,
            method,
        }, "fetchData error");
        throw new TypeError("UNACCEPTABLE PARAMS");
    }
    return axios[method](url, body)
        .then((res) => {
            return res.data;
        })
        .catch((e) => {
            if (e.response) {
                let errorMsg = e.response?.data?.error || REQUEST_INTERNET_ERROR;
                const status = +e.response.status;
                if (status >= 400 && status < 500) {
                    errorMsg = e.response?.data?.error || REQUEST_UNKNOWN;
                } else if (status >= 500) {
                    errorMsg = e.response?.data?.error || REQUEST_SERVER_ERROR;
                } else {
                    errorMsg = e.response?.data?.error || REQUEST_UNKNOWN_ERROR;
                }
                e.message = errorMsg;
                throw new Error(errorMsg);
            }
        });
}

export function getData({
    mainUrl,
    params = {},
}) {
    const url = mainUrl + queryBuilder(params);
    return fetchData({
        url,
        method: "get",
    });
}

export function postData({
    mainUrl,
    body = {},
    params = {},
}) {
    return fetchData({
        url: mainUrl + queryBuilder(params),
        method: "post",
        body,
    });
}

export function delData(url) {
    return fetchData({
        url,
        method: "delete",
    });
}

export function putData({
    mainUrl,
    body,
}) {
    return fetchData({
        url: mainUrl,
        method: "put",
        body,
    });
}

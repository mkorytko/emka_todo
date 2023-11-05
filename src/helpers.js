const patterns = {
    email: /[^а-яА-ЯеЁ<>,?'"`#№$:;%^&*=+|\\~{}()[\] ][-_]*(\w)*(\d)*@(\d)*(\w)*[-_]*\.[a-z]{2,5}/gi,
};

export const validField = (str, fieldType) => {
    if (str) {
        const match = str.match(patterns[fieldType]);
        return !!(match && str === match.join(""));
    }
    return false;
};

export const callBackIsFn = (cb) => typeof cb === "function";

export const getIsAdmin = () => {
    return Boolean(localStorage.getItem("isAdmin"));
};

export const loginSuccessStorage = () => {
    localStorage.setItem("isAdmin", "1");
};

export const clearStorage = () => {
    localStorage.removeItem("isAdmin");
};

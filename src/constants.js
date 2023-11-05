export const TOASTIFY_AUTO_CLOSE_TIME = 1500;
export const AUTH_ERROR_AUTO_CLEAR_TIME = 2000;
export const MODAL_AUTO_CLOSE_TIME = 500;

export const REQUEST_UNKNOWN = "Неизвестный запрос";
export const REQUEST_SERVER_ERROR = "Ошибка сервера. Попробуйте позже";
export const REQUEST_UNKNOWN_ERROR = "Неизвестная ошибка";
export const REQUEST_INTERNET_ERROR = "Проблемы подключения к интернету";

export const AUTHORISE_FAILED_RULES = "Не все поля заполнены";
export const AUTHORISE_SUCCESS = "Авторизация выполнена";
export const AUTHORISE_FAILED = "Авторизация не выполнена";
export const AUTHORISE_WRONG = "Не верные данные";
export const AUTHORISE_LOGOUT = "Вы вышли из админки";

export const UPDATE_TASK_UNCHANGED = "Изменения не внесены";

export const FIELD_EMAIL_FAILED = "Почта указана некорректно";
export const TASK_ADD_SUCCESS = "Задача успешно добавлена";

export const ADMIN_LOGIN = "admin";
export const ADMIN_PWD = "123";

export const DEFAULT_TASK_USER = "Name";
export const DEFAULT_TASK_EMAIL = "Email@example.box";
export const DEFAULT_TASK_TEXT = "Task";

export const ORDER_COLS = [
    {
        title: "#",
        orderCol: "id",
        order: "asc",
        name: "id",
    },
    {
        title: "Имя",
        orderCol: "name",
        order: "asc",
        name: "name",
    },
    {
        title: "Почта",
        orderCol: "email",
        order: "asc",
        name: "email",
    },
    {
        title: "Задача",
        name: "task",
    },
    {
        title: "Статус",
        orderCol: "done",
        order: "asc",
        name: "done",
    },
];

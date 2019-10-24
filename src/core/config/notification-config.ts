export default class NotificationConfig {
    public static getErrorsConfig(message: string, title: string = 'Ошибка!') {
        return {
            group: 'error-message',
            type: 'error',
            title,
            text: message,
        };
    }

    public static getSuccessConfig(message: string, title: string = 'Успех!') {
        return {
            group: 'success-message',
            type: 'success',
            title,
            text: message,
        };
    }
}

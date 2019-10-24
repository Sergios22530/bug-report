import config from '@/core/config/request';
import axios from 'axios';
import objectToFormData from 'object-to-formdata';

export interface ErrorResponseInterface {
    code: number;
    message: string;
}

class Request {
    public static readonly OK = 200;
    public static readonly CREATED = 201;
    public static readonly DELETED = 204;
    public static readonly BAD_REQUEST = 400;
    public static readonly UNAUTHORIZED = 401;
    public static readonly FORBIDDEN = 403;
    public static readonly NOT_FOUND = 404;
    public static readonly VALIDATION_FAILED = 422;
    public static readonly INTERNAL_SERVER_ERROR = 500;
    public static readonly SERVICE_UNAVAILABLE = 503;

    public static readonly POST_METHOD = 'post';
    public static readonly GET_METHOD = 'get';
    public static readonly PUT_METHOD = 'put';
    public static readonly DELETE_METHOD = 'delete';

    private static getCSRFToken(): object | null {
        const tokenContentElement = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
        const tokenParamElement = document.querySelector('meta[name="csrf-param"]') as HTMLMetaElement;

        if (tokenContentElement && tokenParamElement) {
            return {[tokenParamElement.content]: tokenContentElement.content};
        }

        return null;
    }

    public post(url: string, params: any = null): Promise<any> {
        const token = Request.getCSRFToken();
        if (token) {
            Object.assign(params, token);
        }

        const data = objectToFormData(params);

        return this.send(url, Request.POST_METHOD, {data});
    }

    public get(url: string, params: any = null): Promise<any> {
        const token = Request.getCSRFToken();
        if (token) {
            Object.assign(params, token);
        }

        return this.send(url, Request.GET_METHOD, {params});
    }

    public put(url: string, params: any = null): Promise<any> {
        const token = Request.getCSRFToken();
        if (token) {
            Object.assign(params, token);
        }

        return this.send(url, Request.PUT_METHOD, {data: params});
    }

    public delete(url: string, params: any = null): Promise<any> {
        const token = Request.getCSRFToken();
        if (token) {
            Object.assign(params, token);
        }

        return this.send(url, Request.DELETE_METHOD, {data: params});
    }

    private send(url: string, method: string, params: object | null): Promise<any> {
        return new Promise<void>((result, reject?) => {

            const path = `/${config.controller}/${url}${config.sufix}`;
            const token = Request.getCSRFToken();

            const requestConfig = {
                headers: Object.assign({
                    'Content-Type': method === 'post' ?
                        'multipart/form-data;charset=UTF-8' :
                        'applocation/json;charset=UTF-8',
                }, token),
                url: path,
                responseType: 'json',
                method,
            };

            if (params) {
                Object.assign(requestConfig, params);
            }

            axios(requestConfig).then((response) => {
                const SUCCESS_STATUS = [
                    Request.OK,
                    Request.CREATED,
                    Request.DELETED,
                ];

                if (SUCCESS_STATUS.some((code) => response.status === code)) {
                    result(response.data);
                    return;
                }

                reject(response.data);
            }).catch((response: any) => {
                const responseData = response.response;
                const status = responseData.status;

                if (status && status === Request.UNAUTHORIZED) {
                    reject({code: status, message: 'Авторизуйся і спробуйте ще раз.'});
                }

                let message = response.response.message;

                if (!message) {
                    message = 'Виникла помилка. Повторіть спробу пізніше.';
                }

                reject({code: status, message} as ErrorResponseInterface);
            });
        });
    }
}

export default new Request();


import { Response } from 'express';

interface ApiResponse<T> {
    data?: T;
    message?: string;
}

export const sendApiResponse = <T>(res: Response, data?: T, message?: string, statusCode = 200) => {
    const responseData: ApiResponse<T> = {};
    
    if (data !== undefined) {
        responseData.data = data;
    }
    
    if (message) {
        responseData.message = message;
    }

    return res.status(statusCode).json(responseData);
};

export const sendError = (res: Response, message: string, statusCode = 500) => {
    return sendApiResponse(res, undefined, message, statusCode);
};

export const sendNotFound = (res: Response, message = 'Not found') => {
    return sendError(res, message, 404);
};

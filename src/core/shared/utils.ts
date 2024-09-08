export function responseSusses(message: string, data: any) {
    return {
        susses: true,
        message: message,
        data: data,
        statusCode: 200
    }
}

export function responseError(message: string, data: any, error?: number) {
    return {
        susses: false,
        message: message,
        data: data,
        statusCode: error ? error : 400
    }
}
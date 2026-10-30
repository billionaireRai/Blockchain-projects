import { ModalDataType } from "@/types/status.type";

// function hanlding structured return data based on status...
function getStatusData(status: number): ModalDataType {
    switch (status) {

        // 2xx - Success Responses
        case 200:
            return {
                type: "success",
                status:status,
                title: "Success",
                message: "Request completed successfully.",
                description: "Your request has been processed successfully, and the operation was completed without any issues.",
            };

        case 201:
            return {
                type: "success",
                status:status,
                title: "Created",
                message: "Resource created successfully.",
                description: "Your new resource has been created and is now available for use.",
            };

        case 202:
            return {
                type: "info",
                status:status,
                title: "Accepted",
                message: "Your request has been accepted for processing.",
                description: "The server has received your request and will process it. The operation may take some time to complete.",
            };

        case 204:
            return {
                type: "success",
                status:status,
                title: "Completed",
                message: "Operation completed successfully.",
                description: "Your request was successfully processed. No additional information was returned by the server.",
            };

        // 4xx - Client Errors
        case 400:
            return {
                type: "error",
                status:status,
                title: "Bad Request",
                message: "Invalid request. Please check your input.",
                description: "The server could not process your request because some information was missing, incorrect, or improperly formatted.",
            };

        case 401:
            return {
                type: "warning",
                status:status,
                title: "Unauthorized",
                message: "Please log in to continue.",
                description: "Your authentication credentials are missing, invalid, or expired. Please sign in again to access this resource.",
            };

        case 403:
            return {
                type: "error",
                status:status,
                title: "Forbidden",
                message: "You don't have permission to perform this action.",
                description: "Your account does not have the required permissions to access this resource or perform the requested operation.",
            };

        case 404:
            return {
                type: "error",
                status:status,
                title: "Not Found",
                message: "The requested resource could not be found.",
                description: "The resource you are looking for may have been removed, relocated, or may no longer be available.",
            };

        case 405:
            return {
                type: "error",
                status:status,
                title: "Method Not Allowed",
                message: "This operation is not supported.",
                description: "The server does not allow the requested HTTP method for this resource.",
            };

        case 408:
            return {
                type: "warning",
                status:status,
                title: "Request Timeout",
                message: "The request timed out. Please try again.",
                description: "The server did not receive your complete request within the expected time. Please check your connection and retry.",
            };

        case 409:
            return {
                type: "warning",
                status:status,
                title: "Conflict",
                message: "This resource already exists or conflicts with existing data.",
                description: "The requested operation could not be completed because it conflicts with the current state of the resource.",
            };

        case 413:
            return {
                type: "error",
                status:status,
                title: "Payload Too Large",
                message: "The uploaded file or request is too large.",
                description: "The size of your request exceeds the server's allowed limit. Please reduce the file size or amount of data and try again.",
            };

        case 422:
            return {
                type: "warning",
                status:status,
                title: "Validation Failed",
                message: "Please check the provided information.",
                description: "Some submitted fields contain invalid or unacceptable values. Review your input and correct any errors before continuing.",
            };

        case 429:
            return {
                type: "warning",
                status:status,
                title: "Too Many Requests",
                message: "Too many requests. Please try again later.",
                description: "You have exceeded the allowed request limit. Please wait a moment before making another request.",
            };

        // 5xx - Server Errors
        case 500:
            return {
                type: "error",
                status:status,
                title: "Internal Server Error",
                message: "Something went wrong on our server.",
                description: "An unexpected error occurred while processing your request. Please try again later. If the issue persists, contact support.",
            };

        case 502:
            return {
                type: "error",
                status:status,
                title: "Bad Gateway",
                message: "The server received an invalid response.",
                description: "The server encountered an issue while communicating with another service. This is usually temporary, so please try again shortly.",
            };

        case 503:
            return {
                type: "warning",
                status:status,
                title: "Service Unavailable",
                message: "Service is temporarily unavailable.",
                description: "The server is currently unable to handle your request due to maintenance, high traffic, or temporary downtime. Please try again later.",
            };

        case 504:
            return {
                type: "error",
                status:status,
                title: "Gateway Timeout",
                message: "The server took too long to respond.",
                description: "The server did not receive a timely response from another service. Please wait a moment and try again.",
            };

        // Unknown Status
        default:
            return {
                type: "info",
                status:status,
                title: "Unexpected Response",
                message: "An unexpected response was received.",
                description: "The server returned a response that could not be identified. Please try again or contact support if the problem continues.",
            };
    }
}

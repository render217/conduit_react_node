import { AxiosError, isAxiosError } from "axios";
import { toast } from "react-toastify";

export const handle400Error = (
    error: AxiosError,
    callback: (message: string) => void
) => {
    if (
        error.response &&
        (error.response.status === 400 || error.response.data)
    ) {
        const errorsData = error.response.data as {
            message: string;
        };
        callback(errorsData.message);
        return errorsData.message;
    }

    return "Something went wrong. please try again later";
};

export const handle422Error = (
    error: AxiosError,
    callback: (errors: { [key: string]: string[] }[]) => void
) => {
    if (
        error.response &&
        (error.response.status === 422 || error.response.data)
    ) {
        const errorsData = error.response.data as {
            errors?: { [key: string]: string[] }[];
        };
        if (errorsData.errors) {
            callback(errorsData.errors);
        }
        return errorsData.errors;
    }
    return null;
};

export const handleError = (error: unknown) => {
    if (isAxiosError(error)) {
        // Axios-specific error handling

        if (error.response) {
            const status = error.response.status;

            // Handle specific status codes
            switch (status) {
                case 400:
                    handle400Error(error, (message) => {
                        errorLogger(400, { message });
                        toast.error(message);
                    });
                    break;
                case 422:
                    handle422Error(error, (errors) => {
                        errorLogger(422, { errors });
                        for (const error of errors) {
                            for (const key in error) {
                                toast.error(`${key}: ${error[key]}`);
                            }
                        }
                    });
                    break;
                case 401:
                    errorLogger(401, null);
                    toast.error("Unauthorized: Please log in to continue.");
                    // and do some redirect.
                    break;
                case 403:
                    errorLogger(403, null);
                    toast.error(
                        "Forbidden: You do not have permission to perform this action."
                    );

                    break;
                case 404:
                    errorLogger(404, null);
                    toast.error(
                        "Not Found: The requested resource could not be found."
                    );
                    break;
                default:
                    toast.error(
                        `An unexpected error occurred. Status code: ${status}`
                    );
            }
        } else if (error.request) {
            // The request was made, but no response was received
            console.log("No response received:", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error setting up request:", error.message);
        }
    } else {
        // Handle non-Axios errors (if any)
        console.log("An unexpected error occurred:", error);
    }
};

const errorLogger = (status: number, payload: unknown) => {
    console.group("Error status", status);
    console.log(payload);
    console.groupEnd();
};

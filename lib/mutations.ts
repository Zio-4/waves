import fetcher from "./fetcher";

export const auth = (
    mode: 'signup' | 'signin', 
    body: { email: string, password: string, firstName: string, lastName: string }
) => {
    return fetcher(`/${mode}`, body)
}
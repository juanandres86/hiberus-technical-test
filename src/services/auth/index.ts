import axios from 'axios'
import { ServiceResponse } from '../../types/service.types';

export async function singUpService (name:string, surname:string, email:string, password:string): Promise<ServiceResponse> {
    try{
        const response = await axios.post(
            'http://51.38.51.187:5050/api/v1/auth/sign-up',
            {
                name: name,
                surname: surname,
                email: email,
                password: password
            },
            {
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                },
                validateStatus: (status: number) => {
                    return status === 204 || status === 409;
                }
            });
            if (response.status === 204){
                return {
                    success: true,
                    message: "Registrado con éxito"
                }
            }
            if (response.status === 409) {
                return {
                    success: false,
                    message: "Email ya registrado"
                }
            }
        } catch(_) {
            return {
                success: false,
                message: "Error desconocido"
            }
        }
        return {
            success: false,
            message: "Error desconocido"
        }
}

export async function loginService(email: string, password:string): Promise<ServiceResponse> {
    try {
        const response = await axios.post(
            'http://51.38.51.187:5050/api/v1/auth/log-in',
            {
                email: email,
                password: password
            },
            {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                validateStatus: (status: number) => {
                    return status === 200 || status === 404 || status === 601;
                }
            })
        if (response.status === 200) {
            return {
                success: true,
                message:"Login con exito",
                data: {
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken,
                    tokenType: response.data.tokenType
                }
            }
        }
        if (response.status === 404) {
            return {
                success: false,
                message: "Email no existe o password incorrecto"
            }
        }
        if (response.status === 601) {
            return {
                success: false,
                message:"Usuario no registrado"}
        }
    } catch (_) {
        // otro código de error no está definido, devolvemos error desconocido
        return {
            success: false,
            message:"Error desconocido"
        }
    }
    return {
        success: false,
        message:"Error desconocido"
    }
}
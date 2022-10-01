import axios from 'axios'
import { ServiceResponse } from '../../types/service.types';

export async function singUpService (name:string, surname:string, email:string, password:string): Promise<ServiceResponse> {
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
        return {
            success: false,
            message: "Error desconocido"
        }
}

export async function loginService(email: string, password:string): Promise<ServiceResponse> {
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
            message:"Email no existe o password incorrecto"}
    }
    if (response.status === 601) {
        return {
            success: false,
            message:"Usuario no registrado"}
    }
    return {
        success: false,
        message:"Error desconocido"
    }
}
import axios from 'axios'
import { ServiceResponse } from '../../types/service.types'
import { User } from '../../types/user.types';

export async function getUsersService(token:string): Promise<ServiceResponse> {

    try {
        const response = await axios.get('http://51.38.51.187:5050/api/v1/users', {
            headers: {
                'accept': 'application/json',
                'Authorization': token
            },
            validateStatus: (status: number) => {
                return status === 200;
            }
        })
        if (response.status === 200){
            console.log(response.data.items);
            return {
                success: true,
                message: "Listado obtenido con éxito",
                data: response.data.items
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

export async function getCurrentUserInfoService(tokenType: string, token: string): Promise<ServiceResponse> {
    try {
        const response = await axios.get('http://51.38.51.187:5050/api/v1/users/me', {
            headers: {
                'accept': 'application/json',
                'Authorization': `${tokenType} ${token}`
            },
            validateStatus: (status: number) => {
                return status === 200;
            }
        })
        if (response.status === 200){
            return {
                success: true,
                message: "Usuario obtenido con éxito",
                data: response.data
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

export async function updateUserService(newUser: User, token: string): Promise<ServiceResponse> {
    try {
        const response = await axios.put(`http://51.38.51.187:5050/api/v1/users/${newUser.id}`, newUser, {
            headers: {
                'accept': 'application/json',
                'Authorization': token
            },
            validateStatus: (status: number) => {
                return status === 200 || status === 404;
            }
        })
        if (response.status === 200) {
            return {
                success: true,
                message: "Usuario actualizado con éxito"
            }
        }
        if (response.status === 404) {
            return {
                success: false,
                message: "Usuario no encontrado"
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

export async function createUserService(name:string, surname:string, email:string, password:string, token: string): Promise<ServiceResponse> {
    try {
        const response = await axios.post(`http://51.38.51.187:5050/api/v1/users/`, {name, surname, email, password}, {
            headers: {
                'accept': 'application/json',
                'Authorization': token
            },
            validateStatus: (status: number) => {
                return status === 201;
            }
        })
        if (response.status === 201) {
            return {
                success: true,
                message: "Usuario creado con éxito"
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

export async function removeUserService(userId: string, token: string): Promise<ServiceResponse> {
    try {
        const response = await axios.delete(`http://51.38.51.187:5050/api/v1/users/${userId}`, {
            headers: {
                'accept': 'application/json',
                'Authorization': token
            },
            validateStatus: (status: number) => {
                return status === 204 || status === 404;
            }
        })
        if (response.status === 204) {
            return {
                success: true,
                message: "Usuario eliminado con éxito"
            }
        }
        if (response.status === 404) {
            return {
                success: false,
                message: "Usuario no encontrado"
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
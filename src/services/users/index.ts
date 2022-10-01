import axios from 'axios'
import { ServiceResponse } from '../../types/service.types'

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

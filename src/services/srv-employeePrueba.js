import HTTP_APP from '@/config/axios-conf-app'

const srvEmployeePrueba = {

    getEmployees() {
        return HTTP_APP.get('/employees').then((response) => {
            return response
            })
    }
}

export default srvEmployeePrueba

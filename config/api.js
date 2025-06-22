const API_BASE_URL = 'http://192.168.1.13:4000/api';

export const API_ENDPOINTS = {
    auth: {
        registroCliente: `${API_BASE_URL}/auth/registro/cliente`,
        registroProfesional: `${API_BASE_URL}/auth/registro/profesional`,
        login: `${API_BASE_URL}/auth/login`,
    },
    profiles: {
        profesionales: `${API_BASE_URL}/profiles/profesionales`,
        clientes: `${API_BASE_URL}/profiles/clientes`,
        profesional: (id) => `${API_BASE_URL}/profiles/profesional/${id}`,
        buscarProfesionales: `${API_BASE_URL}/profiles/profesionales/buscar`
    },
    connections: {
        crear: `${API_BASE_URL}/connections/crear`,
        cliente: (clienteId) => `${API_BASE_URL}/connections/cliente/${clienteId}`,
        verificar: `${API_BASE_URL}/connections/verificar`,
        eliminar: (connectionId) => `${API_BASE_URL}/connections/${connectionId}`
    }
};

export const apiConfig = {
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
}; 
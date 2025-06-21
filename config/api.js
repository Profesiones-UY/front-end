const API_BASE_URL = 'http://127.0.0.1:4000/api';

export const API_ENDPOINTS = {
    auth: {
        registroCliente: `${API_BASE_URL}/auth/registro/cliente`,
        registroProfesional: `${API_BASE_URL}/auth/registro/profesional`,
        login: `${API_BASE_URL}/auth/login`,
    },
    profiles: {
        profesionales: `${API_BASE_URL}/profiles/profesionales`,
        clientes: `${API_BASE_URL}/profiles/clientes`,
        profesional: (id) => `${API_BASE_URL}/profiles/profesional/${id}`
    }
};

export const apiConfig = {
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
}; 
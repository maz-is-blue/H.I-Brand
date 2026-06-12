const BASE = '/api'

function authHeaders() {
  const token = localStorage.getItem('hib_admin_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...authHeaders() },
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw Object.assign(new Error(data.message || 'Request failed'), { status: res.status, data })
  return data
}

export const api = {
  getProducts: () => request('GET', '/products'),
  createProduct: (data) => request('POST', '/products', data),
  updateProduct: (id, data) => request('PUT', `/products/${id}`, data),
  deleteProduct: (id) => request('DELETE', `/products/${id}`),
  adminLogin: (password) => request('POST', '/admin/login', { password }),
  adminLogout: () => request('POST', '/admin/logout'),
}

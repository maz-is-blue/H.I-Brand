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

async function uploadFile(path, file, extraFields = {}) {
  const form = new FormData()
  Object.entries(extraFields).forEach(([k, v]) => form.append(k, v))
  form.append('image', file)
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { Accept: 'application/json', ...authHeaders() },
    body: form,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw Object.assign(new Error(data.message || 'Upload failed'), { status: res.status, data })
  return data
}

export const api = {
  getProducts: () => request('GET', '/products'),
  createProduct: (data) => request('POST', '/products', data),
  updateProduct: (id, data) => request('PUT', `/products/${id}`, data),
  deleteProduct: (id) => request('DELETE', `/products/${id}`),
  addProductImage: (id, file) => uploadFile(`/products/${id}/images`, file),
  deleteProductImage: (productId, imageId) => request('DELETE', `/products/${productId}/images/${imageId}`),
  adminLogin: (username, password) => request('POST', '/admin/login', { username, password }),
  adminLogout: () => request('POST', '/admin/logout'),
  getContent: () => request('GET', '/content'),
  updateContent: (items) => request('PUT', '/content', { items }),
  uploadContentImage: (key, file) => uploadFile('/content/image', file, { key }),
}

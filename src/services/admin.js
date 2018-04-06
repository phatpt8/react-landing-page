import { get, post, put, del } from '../utils/request';

export function login(values) {
  return post('/api/login', values);
}

export function fetchArticles() {
  return get('/api/articles');
}

export function fetch({ page = 1 }) {
  return get(`/api/users`);
}

export function remove(id) {
  return del(`/api/users/${id}`);
}

export function update(id, values) {
  return put(`/api/users/${id}`, values);
}

export function create(values) {
  return post('/api/users', values);
}

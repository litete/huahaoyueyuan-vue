import request from '@/utils/request'

export function postAttest(data) {
  return request({
    url: '/attest',
    method: 'post',
    data
  })
}
export function selectAttest(id, status) {
  return request({
    url: '/attest',
    method: 'put',
    params: { id } && { status }
  })
}

export function putAttest(page, size) {
  return request({
    url: '/attest/all',
    method: 'get',
    params: { page } && { size }
  })
}

export function getById() {
  return request({
    url: '/attest',
    method: 'get'
  })
}

export function deleteById(attestId) {
  return request({
    url: `/attest/${attestId}`,
    method: 'delete'
  })
}

export function deletemy() {
  return request({
    url: '/attest',
    method: 'delete'
  })
}

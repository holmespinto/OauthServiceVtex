import axios from 'axios'
import { variables } from '../../constants/variables'

/**
 * Obtiene toods los usuarios identificados por el email proporcionado
 *
 * @param  {string}   email       E-mail a buscar
 * @return {resource}             Response
 */
export const getUserByEmail = (email) => {
  return axios({
    method: 'get',
    url: `/_v/auth/`,
    headers: {
      'content-type': 'application/json',
    },
    params: { email },
  })
}

/**
 * Actualiza la información del usuario.
 *
 *
 *
 * @param  {string}   userId      Id del usuario en Auth0
 * @param  {object}   payload     Json con la información a actualizar
 * @return {resource}             Response
 */
export const updateUserInfo = (userId, payload) => {
  return axios({
    method: 'patch',
    url: `/_v/updateUserInfo/${userId}`,
    headers: {
      'Content-Type': 'application/json',
    },
    payload,
  })
}

export const updateUserVtex = (userId, payload) => {
  // console.log(`payload`, payload)

  return axios({
    method: 'patch',
    url: `${process.env.AUTH0_URL}/api/dataentities/CL/documents/${userId}`,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    data: payload,
  })
}

export const startPasswordless = (telefono) => {
  return axios({
    method: 'post',
    url: `/passwordless/start`,
    headers: { 'content-type': 'application/json' },
    data: payload,
  })
}

export const linkAccounts = (users, accessToken) => {
  const payload = {
    user_id: users[1].id,
    provider: users[1].connector,
  }

  return axios({
    method: 'post',
    url: `${process.env.AUTH0_URL}/api/v2/users/${users[0].id}/identities`,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data: payload,
  })
}

export const linkAccountsV2 = (idUser, tokenSecondary, accessToken) => {
  return axios({
    method: 'post',
    url: `${process.env.AUTH0_URL}/api/v2/users/${idUser}/identities`,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data: { link_with: tokenSecondary },
  })
}

export const unlinkAccounts = (
  { primaryId, secondaryId, provider },
  accessToken
) => {
  return axios({
    method: 'delete',
    url: `${process.env.AUTH0_URL}/api/v2/users/${primaryId}/identities/${provider}/${secondaryId}`,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

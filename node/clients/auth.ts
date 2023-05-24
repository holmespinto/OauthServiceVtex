import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api';
import { environment } from '../../environments/environment';
const TIMEOUT = 4 * 1000

export class AuthClient extends ExternalClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(environment.URL_BASE, ctx, {
      ...options,
      headers: {
        ...options?.headers,
        'x-vtex-use-https': 'true',
      },
      timeout: TIMEOUT,
    })
  }


  /**
 * GENERA EL TOKEN DEL SERVICIO
 * @see https://auth0.com/docs/quickstart/backend/python/02-using
 * @param  {string}   email       E-mail a buscar
 * @return {resource}             Response
 */
  public getToken = async (): Promise<any> => {
    let body = {
      client_id: environment.CLIENT_ID,
      client_secret: environment.CLIENT_SECRET,
      audience: environment.AUDIENCE,
      grant_type: 'client_credentials',
    }
    try {
      const response = await this.http.post(
        `/oauth/token`,
        body
      )
      return response
    } catch (err) {
      console.log('err: ', err)
    }
  }

/**
 * Obtiene el usuario identificados por el email proporcionado
 * @see https://auth0.com/docs/api/management/v2#!/Users/patch_users_by_id
 * @param  {string}   email       E-mail a buscar
 * @return {resource}             Response
 */
  public getUserByEmail = async (email: string): Promise<any> => {
    try {
      const { access_token } = await this.getToken();
      const response = await this.http.get(
        `/api/v2/users-by-email`,
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
          params: { email }
        },
      )
      return response
    } catch (err) {
      console.log('err:', err)
    }

  }

  /**
 * ACTUALIZA el usuario identificados por el email proporcionado
 * @see https://auth0.com/docs/manage-users/user-accounts/metadata/manage-metadata-api
 * @param  {user_id}   user_id       E-user_id a buscar
 * @param  {body}   user_id       body a actualizar
 * @return {resource}             Response
 */
  public updateUserInfo = async (user_id: string, body?: any): Promise<any> => {
    try {
      const { access_token } = await this.getToken();

      const response = await this.http.patch(
        `/api/v2/users/${user_id}`,
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
          body
        },
      )
      return response
    } catch (err) {
      console.log('err:', err)
    }

  }

    /**
 * EL USUARIO RECIBE POR SU CELULAR EL CODIGO OTP
 *
 * @param  {telefono}   telefono       telefono a buscar
 * @param https://auth0.com/docs/authenticate/passwordless/implement-login/embedded-login/relevant-api-endpoints
 * @return {resource}             Response
 */
  public startPasswordLess = async (telefono: string): Promise<any> => {

    try {
      let body = {
        client_id: environment.CLIENT_ID,
        client_secret: environment.CLIENT_SECRET,
        audience: environment.AUDIENCE,
        grant_type: 'client_credentials',
        connection: 'sms',
        phone_number: telefono,
        send: 'code',
      }
      const response = await this.http.post(
        `/passwordless/start`,
        {
          headers: {
            'content-type': 'application/json',
          },
          body
        },
      )
      return response
    } catch (err) {
      console.log('err:', err)
    }
  }

}

import { jwtDecode } from 'jwt-decode';

class AccountApi {
  me(request) {
    const { accessToken } = request

    return new Promise((resolve, reject) => {
      try {
        // Decode access token
        const decodedToken = jwtDecode(accessToken)
        console.log(' >>> decodeToken >>> ', decodedToken);

        const currrentTime = Date.now() / 1000;

        if (decodedToken.exp < currrentTime) {
          // Token has expired
          reject(new Error('Token expired'));
        } else {
          const { _id, name, email, website } = decodedToken;
          resolve({
            _id: _id,
            name: name,
            email: email,
            website: website
          });
        }
      } catch (err) {
        console.error('[Account Api]: ', err)
        reject(new Error('Internal server error'))
      }
    })
  }
}

export const accountApi = new AccountApi()
import { AuthService } from 'auth-oidc';
import * as Config from '../config';

export const authService = new AuthService({
  authority: Config.AUTHORITY,
  clientId: Config.CLIENT_ID,
  autoLogin: false,
});

// export const authService = null;

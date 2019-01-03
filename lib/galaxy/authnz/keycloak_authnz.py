
import json
import logging

from oauthlib.common import generate_nonce
from requests_oauthlib import OAuth2Session

from galaxy.model import KeycloakAuthRequest, User
from ..authnz import IdentityProvider

log = logging.getLogger(__name__)


class KeycloakAuthnz(IdentityProvider):
    def __init__(self, provider, oidc_config, oidc_backend_config):
        self.config = {'provider': provider.lower()}
        self.config['verify_ssl'] = oidc_config['VERIFY_SSL']
        self.config['client_id'] = oidc_backend_config['client_id']
        self.config['client_secret'] = oidc_backend_config['client_secret']
        self.config['redirect_uri'] = oidc_backend_config['redirect_uri']
        self.config['authorization_endpoint'] = oidc_backend_config['authorization_endpoint']
        self.config['token_endpoint'] = oidc_backend_config['token_endpoint']
        self.config['userinfo_endpoint'] = oidc_backend_config['userinfo_endpoint']

    def authenticate(self, trans):
        client_id = self.config['client_id']
        base_authorize_url = self.config['authorization_endpoint']
        redirect_uri = self.config['redirect_uri']
        oauth2_session = OAuth2Session(
            client_id, scope=('openid', 'email', 'profile'), redirect_uri=redirect_uri)
        nonce = generate_nonce()
        authorization_url, state = oauth2_session.authorization_url(
            base_authorize_url, nonce=nonce)
        # store state and nonce in database
        trans.sa_session.add(KeycloakAuthRequest(nonce, state))
        trans.sa_session.flush()
        return authorization_url

    def callback(self, state_token, authz_code, trans, login_redirect_url):
        client_id = self.config['client_id']
        client_secret = self.config['client_secret']
        redirect_uri = self.config['redirect_uri']
        token_endpoint = self.config['token_endpoint']
        userinfo_endpoint = self.config['userinfo_endpoint']
        oauth2_session = OAuth2Session(client_id,
                                       scope=('openid', 'email', 'profile'),
                                       redirect_uri=redirect_uri,
                                       state=state_token)
        token = oauth2_session.fetch_token(
            token_endpoint, client_secret=client_secret,
            authorization_response=trans.request.url)
        log.debug("token={}".format(json.dumps(token, indent=True)))
        # TODO: get nonce from token['id_token'] and validate
        # TODO: delete the nonce record once it is validated
        userinfo = oauth2_session.get(userinfo_endpoint).json()
        log.debug("userinfo={}".format(json.dumps(userinfo, indent=True)))
        username = userinfo["preferred_username"]
        email = userinfo["email"]
        user = self._get_user(trans.sa_session, username, email)
        return login_redirect_url, user

    def disconnect(self, provider, trans, disconnect_redirect_url=None, association_id=None):
        pass

    def _get_user(self, sa_session, username, email):
        user = sa_session.query(User).filter_by(username=username).first()
        if not user:
            user = self._create_user(sa_session, username, email)

    def _create_user(self, sa_session, username, email):
        user = User(email=email, username=username)
        user.set_random_password()
        sa_session.add(user)
        sa_session.flush()
        return user

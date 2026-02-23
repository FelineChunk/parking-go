import * as runtime from "@prisma/client/runtime/client";
export const PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export const PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export const PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export const PrismaClientValidationError = runtime.PrismaClientValidationError;
export const sql = runtime.sqltag;
export const empty = runtime.empty;
export const join = runtime.join;
export const raw = runtime.raw;
export const Sql = runtime.Sql;
export const Decimal = runtime.Decimal;
export const getExtensionContext = runtime.Extensions.getExtensionContext;
export const prismaVersion = {
    client: "7.4.0",
    engine: "ab56fe763f921d033a6c195e7ddeb3e255bdbb57"
};
export const NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
export const DbNull = runtime.DbNull;
export const JsonNull = runtime.JsonNull;
export const AnyNull = runtime.AnyNull;
export const ModelName = {
    transactions: 'transactions',
    audit_log_entries: 'audit_log_entries',
    flow_state: 'flow_state',
    identities: 'identities',
    instances: 'instances',
    mfa_amr_claims: 'mfa_amr_claims',
    mfa_challenges: 'mfa_challenges',
    mfa_factors: 'mfa_factors',
    oauth_authorizations: 'oauth_authorizations',
    oauth_client_states: 'oauth_client_states',
    oauth_clients: 'oauth_clients',
    oauth_consents: 'oauth_consents',
    one_time_tokens: 'one_time_tokens',
    refresh_tokens: 'refresh_tokens',
    saml_providers: 'saml_providers',
    saml_relay_states: 'saml_relay_states',
    schema_migrations: 'schema_migrations',
    sessions: 'sessions',
    sso_domains: 'sso_domains',
    sso_providers: 'sso_providers',
    auth_users: 'auth_users',
    public_users: 'public_users'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const TransactionsScalarFieldEnum = {
    id_transaction: 'id_transaction',
    card_id: 'card_id',
    time_in: 'time_in',
    time_out: 'time_out',
    fee: 'fee',
    status: 'status'
};
export const Audit_log_entriesScalarFieldEnum = {
    instance_id: 'instance_id',
    id: 'id',
    payload: 'payload',
    created_at: 'created_at',
    ip_address: 'ip_address'
};
export const Flow_stateScalarFieldEnum = {
    id: 'id',
    user_id: 'user_id',
    auth_code: 'auth_code',
    code_challenge_method: 'code_challenge_method',
    code_challenge: 'code_challenge',
    provider_type: 'provider_type',
    provider_access_token: 'provider_access_token',
    provider_refresh_token: 'provider_refresh_token',
    created_at: 'created_at',
    updated_at: 'updated_at',
    authentication_method: 'authentication_method',
    auth_code_issued_at: 'auth_code_issued_at',
    invite_token: 'invite_token',
    referrer: 'referrer',
    oauth_client_state_id: 'oauth_client_state_id',
    linking_target_id: 'linking_target_id',
    email_optional: 'email_optional'
};
export const IdentitiesScalarFieldEnum = {
    provider_id: 'provider_id',
    user_id: 'user_id',
    identity_data: 'identity_data',
    provider: 'provider',
    last_sign_in_at: 'last_sign_in_at',
    created_at: 'created_at',
    updated_at: 'updated_at',
    email: 'email',
    id: 'id'
};
export const InstancesScalarFieldEnum = {
    id: 'id',
    uuid: 'uuid',
    raw_base_config: 'raw_base_config',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
export const Mfa_amr_claimsScalarFieldEnum = {
    session_id: 'session_id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    authentication_method: 'authentication_method',
    id: 'id'
};
export const Mfa_challengesScalarFieldEnum = {
    id: 'id',
    factor_id: 'factor_id',
    created_at: 'created_at',
    verified_at: 'verified_at',
    ip_address: 'ip_address',
    otp_code: 'otp_code',
    web_authn_session_data: 'web_authn_session_data'
};
export const Mfa_factorsScalarFieldEnum = {
    id: 'id',
    user_id: 'user_id',
    friendly_name: 'friendly_name',
    factor_type: 'factor_type',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at',
    secret: 'secret',
    phone: 'phone',
    last_challenged_at: 'last_challenged_at',
    web_authn_credential: 'web_authn_credential',
    web_authn_aaguid: 'web_authn_aaguid',
    last_webauthn_challenge_data: 'last_webauthn_challenge_data'
};
export const Oauth_authorizationsScalarFieldEnum = {
    id: 'id',
    authorization_id: 'authorization_id',
    client_id: 'client_id',
    user_id: 'user_id',
    redirect_uri: 'redirect_uri',
    scope: 'scope',
    state: 'state',
    resource: 'resource',
    code_challenge: 'code_challenge',
    code_challenge_method: 'code_challenge_method',
    response_type: 'response_type',
    status: 'status',
    authorization_code: 'authorization_code',
    created_at: 'created_at',
    expires_at: 'expires_at',
    approved_at: 'approved_at',
    nonce: 'nonce'
};
export const Oauth_client_statesScalarFieldEnum = {
    id: 'id',
    provider_type: 'provider_type',
    code_verifier: 'code_verifier',
    created_at: 'created_at'
};
export const Oauth_clientsScalarFieldEnum = {
    id: 'id',
    client_secret_hash: 'client_secret_hash',
    registration_type: 'registration_type',
    redirect_uris: 'redirect_uris',
    grant_types: 'grant_types',
    client_name: 'client_name',
    client_uri: 'client_uri',
    logo_uri: 'logo_uri',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at',
    client_type: 'client_type',
    token_endpoint_auth_method: 'token_endpoint_auth_method'
};
export const Oauth_consentsScalarFieldEnum = {
    id: 'id',
    user_id: 'user_id',
    client_id: 'client_id',
    scopes: 'scopes',
    granted_at: 'granted_at',
    revoked_at: 'revoked_at'
};
export const One_time_tokensScalarFieldEnum = {
    id: 'id',
    user_id: 'user_id',
    token_type: 'token_type',
    token_hash: 'token_hash',
    relates_to: 'relates_to',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
export const Refresh_tokensScalarFieldEnum = {
    instance_id: 'instance_id',
    id: 'id',
    token: 'token',
    user_id: 'user_id',
    revoked: 'revoked',
    created_at: 'created_at',
    updated_at: 'updated_at',
    parent: 'parent',
    session_id: 'session_id'
};
export const Saml_providersScalarFieldEnum = {
    id: 'id',
    sso_provider_id: 'sso_provider_id',
    entity_id: 'entity_id',
    metadata_xml: 'metadata_xml',
    metadata_url: 'metadata_url',
    attribute_mapping: 'attribute_mapping',
    created_at: 'created_at',
    updated_at: 'updated_at',
    name_id_format: 'name_id_format'
};
export const Saml_relay_statesScalarFieldEnum = {
    id: 'id',
    sso_provider_id: 'sso_provider_id',
    request_id: 'request_id',
    for_email: 'for_email',
    redirect_to: 'redirect_to',
    created_at: 'created_at',
    updated_at: 'updated_at',
    flow_state_id: 'flow_state_id'
};
export const Schema_migrationsScalarFieldEnum = {
    version: 'version'
};
export const SessionsScalarFieldEnum = {
    id: 'id',
    user_id: 'user_id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    factor_id: 'factor_id',
    aal: 'aal',
    not_after: 'not_after',
    refreshed_at: 'refreshed_at',
    user_agent: 'user_agent',
    ip: 'ip',
    tag: 'tag',
    oauth_client_id: 'oauth_client_id',
    refresh_token_hmac_key: 'refresh_token_hmac_key',
    refresh_token_counter: 'refresh_token_counter',
    scopes: 'scopes'
};
export const Sso_domainsScalarFieldEnum = {
    id: 'id',
    sso_provider_id: 'sso_provider_id',
    domain: 'domain',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
export const Sso_providersScalarFieldEnum = {
    id: 'id',
    resource_id: 'resource_id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    disabled: 'disabled'
};
export const Auth_usersScalarFieldEnum = {
    instance_id: 'instance_id',
    id: 'id',
    aud: 'aud',
    role: 'role',
    email: 'email',
    encrypted_password: 'encrypted_password',
    email_confirmed_at: 'email_confirmed_at',
    invited_at: 'invited_at',
    confirmation_token: 'confirmation_token',
    confirmation_sent_at: 'confirmation_sent_at',
    recovery_token: 'recovery_token',
    recovery_sent_at: 'recovery_sent_at',
    email_change_token_new: 'email_change_token_new',
    email_change: 'email_change',
    email_change_sent_at: 'email_change_sent_at',
    last_sign_in_at: 'last_sign_in_at',
    raw_app_meta_data: 'raw_app_meta_data',
    raw_user_meta_data: 'raw_user_meta_data',
    is_super_admin: 'is_super_admin',
    created_at: 'created_at',
    updated_at: 'updated_at',
    phone: 'phone',
    phone_confirmed_at: 'phone_confirmed_at',
    phone_change: 'phone_change',
    phone_change_token: 'phone_change_token',
    phone_change_sent_at: 'phone_change_sent_at',
    confirmed_at: 'confirmed_at',
    email_change_token_current: 'email_change_token_current',
    email_change_confirm_status: 'email_change_confirm_status',
    banned_until: 'banned_until',
    reauthentication_token: 'reauthentication_token',
    reauthentication_sent_at: 'reauthentication_sent_at',
    is_sso_user: 'is_sso_user',
    deleted_at: 'deleted_at',
    is_anonymous: 'is_anonymous'
};
export const Public_usersScalarFieldEnum = {
    id_user: 'id_user',
    username: 'username',
    created_at: 'created_at',
    role: 'role'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const NullableJsonNullValueInput = {
    DbNull: DbNull,
    JsonNull: JsonNull
};
export const JsonNullValueInput = {
    JsonNull: JsonNull
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
export const JsonNullValueFilter = {
    DbNull: DbNull,
    JsonNull: JsonNull,
    AnyNull: AnyNull
};
export const defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map
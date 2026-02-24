export declare const transaction_status: {
    readonly IN: "IN";
    readonly OUT: "OUT";
    readonly DONE: "DONE";
};
export type transaction_status = (typeof transaction_status)[keyof typeof transaction_status];
export declare const aal_level: {
    readonly aal1: "aal1";
    readonly aal2: "aal2";
    readonly aal3: "aal3";
};
export type aal_level = (typeof aal_level)[keyof typeof aal_level];
export declare const code_challenge_method: {
    readonly s256: "s256";
    readonly plain: "plain";
};
export type code_challenge_method = (typeof code_challenge_method)[keyof typeof code_challenge_method];
export declare const factor_status: {
    readonly unverified: "unverified";
    readonly verified: "verified";
};
export type factor_status = (typeof factor_status)[keyof typeof factor_status];
export declare const factor_type: {
    readonly totp: "totp";
    readonly webauthn: "webauthn";
    readonly phone: "phone";
};
export type factor_type = (typeof factor_type)[keyof typeof factor_type];
export declare const oauth_authorization_status: {
    readonly pending: "pending";
    readonly approved: "approved";
    readonly denied: "denied";
    readonly expired: "expired";
};
export type oauth_authorization_status = (typeof oauth_authorization_status)[keyof typeof oauth_authorization_status];
export declare const oauth_client_type: {
    readonly public: "public";
    readonly confidential: "confidential";
};
export type oauth_client_type = (typeof oauth_client_type)[keyof typeof oauth_client_type];
export declare const oauth_registration_type: {
    readonly dynamic: "dynamic";
    readonly manual: "manual";
};
export type oauth_registration_type = (typeof oauth_registration_type)[keyof typeof oauth_registration_type];
export declare const oauth_response_type: {
    readonly code: "code";
};
export type oauth_response_type = (typeof oauth_response_type)[keyof typeof oauth_response_type];
export declare const one_time_token_type: {
    readonly confirmation_token: "confirmation_token";
    readonly reauthentication_token: "reauthentication_token";
    readonly recovery_token: "recovery_token";
    readonly email_change_token_new: "email_change_token_new";
    readonly email_change_token_current: "email_change_token_current";
    readonly phone_change_token: "phone_change_token";
};
export type one_time_token_type = (typeof one_time_token_type)[keyof typeof one_time_token_type];
export declare const level: {
    readonly admin: "admin";
    readonly petugas: "petugas";
    readonly owner: "owner";
};
export type level = (typeof level)[keyof typeof level];
export declare const level_beta: {
    readonly admin: "admin";
    readonly petugas: "petugas";
    readonly owner: "owner";
    readonly super: "super";
};
export type level_beta = (typeof level_beta)[keyof typeof level_beta];
export declare const status: {
    readonly IN: "IN";
    readonly OUT: "OUT";
    readonly DONE: "DONE";
};
export type status = (typeof status)[keyof typeof status];
export declare const type_kendaraan: {
    readonly roda_dua: "roda_dua";
    readonly roda_empat: "roda_empat";
};
export type type_kendaraan = (typeof type_kendaraan)[keyof typeof type_kendaraan];

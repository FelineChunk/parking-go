import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace.js";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    $connect(): runtime.Types.Utils.JsPromise<void>;
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    get transactions(): Prisma.transactionsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get audit_log_entries(): Prisma.audit_log_entriesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get flow_state(): Prisma.flow_stateDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get identities(): Prisma.identitiesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get instances(): Prisma.instancesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get mfa_amr_claims(): Prisma.mfa_amr_claimsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get mfa_challenges(): Prisma.mfa_challengesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get mfa_factors(): Prisma.mfa_factorsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get oauth_authorizations(): Prisma.oauth_authorizationsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get oauth_client_states(): Prisma.oauth_client_statesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get oauth_clients(): Prisma.oauth_clientsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get oauth_consents(): Prisma.oauth_consentsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get one_time_tokens(): Prisma.one_time_tokensDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get refresh_tokens(): Prisma.refresh_tokensDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get saml_providers(): Prisma.saml_providersDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get saml_relay_states(): Prisma.saml_relay_statesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get schema_migrations(): Prisma.schema_migrationsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get sessions(): Prisma.sessionsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get sso_domains(): Prisma.sso_domainsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get sso_providers(): Prisma.sso_providersDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get auth_users(): Prisma.auth_usersDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get public_users(): Prisma.public_usersDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;

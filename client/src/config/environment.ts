import ENVIRONMENT from './current_environment'

export type ENVs = 'staging' | 'production' | 'dev'

const ENV = {
  dev: {
    MAIN_API: 'https://staging.commitmuse.com/',
    PLAID_PUBLIC_KEY: 'a004a070f0629da694fbae916414f3',
    PLAID_ENV: 'sandbox',
  },
  staging: {
    MAIN_API: 'https://staging.commitmuse.com/',
    PLAID_PUBLIC_KEY: 'a004a070f0629da694fbae916414f3',
    PLAID_ENV: 'sandbox',
  },
  production: {
    MAIN_API: 'https://app.commitmuse.com/',
    PLAID_PUBLIC_KEY: 'a004a070f0629da694fbae916414f3',
    PLAID_ENV: 'development',
  },
}

const currentEnv = () => ENV[ENVIRONMENT]

export default currentEnv


import ENVIRONMENT from './current_environment'

export type ENVs = 'staging' | 'production' | 'dev'

const ENV = {
  dev: {
    MAIN_API: 'http://localhost:5000/',
    PLAID_PUBLIC_KEY: 'a004a070f0629da694fbae916414f3',
    PLAID_ENV: 'sandbox',
  },
  staging: {
    MAIN_API: 'https://staging.commitmuse.com/',
    PLAID_PUBLIC_KEY: 'a004a070f0629da694fbae916414f3',
    PLAID_ENV: 'sandbox',
  },
  production: {
    MAIN_API: 'https://commitmuse.herokuapp.com/',
    PLAID_PUBLIC_KEY: 'a004a070f0629da694fbae916414f3',
    PLAID_ENV: 'sandbox',
  },
}

const currentEnv = () => ENV[ENVIRONMENT]

export default currentEnv


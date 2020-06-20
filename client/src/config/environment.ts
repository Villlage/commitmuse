import ENVIRONMENT from './current_environment'

export type ENVs = 'staging' | 'production' | 'dev'

const ENV = {
  dev: {
    MAIN_API: 'http://localhost:5000/',
  },
  staging: {
    MAIN_API: 'http://staging.com/',
  },
  production: {
    MAIN_API: 'http://production.com/',
  },
}

const currentEnv = () => ENV[ENVIRONMENT]

export default currentEnv

import ENVIRONMENT from './current_environment'

export type ENVs = 'staging' | 'production' | 'dev'

const ENV = {
  dev: {
    MAIN_API: 'http://localhost:5000/',
  },
  staging: {
    MAIN_API: 'https://commitmuse-staging.herokuapp.com/',
  },
  production: {
    MAIN_API: 'https://commitmuse.herokuapp.com/',
  },
}

const currentEnv = () => ENV[ENVIRONMENT]

export default currentEnv

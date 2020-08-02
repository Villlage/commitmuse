import ENVIRONMENT from './current_environment'

export type ENVs = 'staging' | 'production' | 'dev'

const ENV = {
  dev: {
    MAIN_API: 'https://commitmuse.herokuapp.com/',
  },
  staging: {
    MAIN_API: 'https://commitmuse.herokuapp.com/',
  },
  production: {
    MAIN_API: 'https://commitmuse.herokuapp.com/',
  },
}

const currentEnv = () => ENV[ENVIRONMENT]

export default currentEnv

import { baseConfig } from '@shared/rollup-config'

import pkg from './package.json' assert { type: 'json' }

export default baseConfig({ input: 'src/index.ts', pkg })

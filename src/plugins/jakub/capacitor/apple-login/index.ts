import { registerWebPlugin } from '@capacitor/core'

import { SignInWithApple } from '@capacitor-community/apple-sign-in'

registerWebPlugin(SignInWithApple)
console.log('apple registered')

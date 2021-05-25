import { registerWebPlugin } from '@capacitor/core'

import { SignInWithApple } from '@capacitor-community/apple-sign-in'

// @ts-expect-error old
registerWebPlugin(SignInWithApple)

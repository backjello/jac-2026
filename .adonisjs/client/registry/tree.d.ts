/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessTokens: {
      store: typeof routes['auth.access_tokens.store']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    accessTokens: {
      destroy: typeof routes['profile.access_tokens.destroy']
    }
  }
  users: {
    index: typeof routes['users.index']
    me: typeof routes['users.me']
    show: typeof routes['users.show']
    store: typeof routes['users.store']
    update: typeof routes['users.update']
    destroy: typeof routes['users.destroy']
  }
}

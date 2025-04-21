import { LinkingOptions } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { makeRedirectUri } from 'expo-auth-session'

const prefix = Linking.createURL('/')

export const linking: LinkingOptions = {
  prefixes: [prefix],
  config: {
    screens: {
      AuthCallback: 'auth/callback',
    },
  },
}
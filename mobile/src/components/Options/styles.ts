import { Dimensions, StyleSheet } from 'react-native'
import { theme } from '../../theme'

export const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },

  options: {
    width: '100%',
    marginBottom: 48,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  title: {
    fontSize: 20,
    marginBottom: 32,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text_primary,
  }
})
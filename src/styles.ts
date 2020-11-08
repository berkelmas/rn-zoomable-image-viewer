import { Dimensions, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  image: {
    height: 400,
    width: Dimensions.get('window').width,
    resizeMode: 'cover',
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  flatlistContainer: {
    alignItems: 'center',
    height: '100%',
  },
})

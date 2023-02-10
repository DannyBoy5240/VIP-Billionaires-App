import * as ReactNative from 'react-native'
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'

jest.mock('@react-native-community/netinfo', () => {})
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)
jest.mock('rn-fetch-blob', () => ({
  Value: jest.fn(),
  event: jest.fn(),
  add: jest.fn(),
  eq: jest.fn(),
  set: jest.fn(),
  cond: jest.fn(),
  interpolate: jest.fn(),
  Extrapolate: { CLAMP: jest.fn() },
  DocumentDir: {},
}))
jest.mock('react-native-device-info', () => ({
  hasNotch: jest.fn(),
  getReadableVersion: jest.fn(),
  getBundleId: jest.fn(),
  getModel: jest.fn(),
  getSystemVersion: jest.fn(),
  isTablet: jest.fn(),
}))
jest.mock('react-native-permissions', () => ({
  PERMISSIONS: {},
}))

jest.doMock('react-native', () => {
  return Object.setPrototypeOf(
    {
      Platform: {
        ...ReactNative.Platform,
        OS: 'ios',
        Version: 123,
        isTesting: true,
        select: objs => objs['ios'],
      },
      NativeModules: {
        ...ReactNative.NativeModules,
        Override: { great: 'success' },
        SettingsManager: {
          settings: {},
        },
        ImageCropPicker: {},
        RNDateTimePickerManager: {
          getDefaultDisplayValue: jest.fn().mockImplementation(() => Promise.resolve()),
        },
      },
      NativeEventEmitter: () => {},
      RNPermissions: {},
    },
    ReactNative,
  )
})

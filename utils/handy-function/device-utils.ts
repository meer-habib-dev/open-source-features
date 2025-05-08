import { mmkvStorage } from './mmkv';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as Device from 'expo-device';
import * as Crypto from 'expo-crypto';

/**
 * Get the unique device ID. If not already set, it will generate a new one based on device hardware info.
 * This function can be used in contexts where hooks are not available.
 */
export async function getDeviceId(): Promise<string> {
  const deviceIdKey = 'device_id';
  let deviceId = mmkvStorage.getItem(deviceIdKey);

  if (!deviceId) {
    // Generate a device ID based on hardware information
    deviceId = await generatePersistentDeviceId();
    mmkvStorage.setItem(deviceIdKey, deviceId);
  }

  return deviceId;
}

/**
 * Generate a persistent device ID based on hardware information
 * This will generate the same ID even if the app is uninstalled and reinstalled
 */
async function generatePersistentDeviceId(): Promise<string> {
  try {
    // Get device information that doesn't change between app installations
    const brand = Device.brand || '';
    const modelName = Device.modelName || '';
    const osName = Device.osName || '';
    const osVersion = Device.osVersion || '';
    const deviceName = Device.deviceName || '';
    const deviceYearClass = Device.deviceYearClass?.toString() || '';

    // Create a string with all the device info
    const deviceInfoString = `${brand}-${modelName}-${osName}-${osVersion}-${deviceName}-${deviceYearClass}`;

    // Hash the device info string to create a consistent ID
    const hashedDeviceId = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      deviceInfoString
    );
    const deviceId = hashedDeviceId.substring(0, 32);

    // Return a shortened version of the hash (first 32 chars)
    return deviceId;
  } catch (error) {
    console.error('Failed to generate persistent device ID:', error);
    // Fallback to UUID if device info can't be accessed
    return uuidv4();
  }
}

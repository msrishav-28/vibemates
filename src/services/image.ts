/**
 * Image Service for handling photo selection, uploads, and basic manipulation
 * 
 * To use camera and photo library features, install:
 * npm install expo-image-picker expo-image-manipulator
 * 
 * Then uncomment the imports below
 */

// Uncomment these imports after installing the packages
// import * as ImagePicker from 'expo-image-picker';
// import * as ImageManipulator from 'expo-image-manipulator';
import { Alert, Platform } from 'react-native';

export interface ImagePickerResult {
  uri: string;
  width: number;
  height: number;
  type?: string;
  base64?: string;
}

export interface ImageUploadOptions {
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
  compress?: boolean;
}

export const imageService = {
  async requestPermissions(): Promise<boolean> {
    try {
      // For now, return false until packages are installed
      console.log('Image picker not configured. Install expo-image-picker and expo-image-manipulator packages.');
      return false;

      // Uncomment below after installing packages:
      /*
      // Request camera permissions
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraPermission.status !== 'granted') {
        Alert.alert(
          'Camera Permission Required',
          'Please allow camera access to take photos.',
          [{ text: 'OK' }]
        );
        return false;
      }

      // Request media library permissions
      const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (mediaPermission.status !== 'granted') {
        Alert.alert(
          'Photo Library Permission Required',
          'Please allow photo library access to select images.',
          [{ text: 'OK' }]
        );
        return false;
      }

      return true;
      */
    } catch (error) {
      console.error('Error requesting image permissions:', error);
      return false;
    }
  },

  async pickImageFromCamera(options: ImageUploadOptions = {}): Promise<ImagePickerResult | null> {
    console.log('Camera picker not available. Install expo-image-picker package.');
    return null;

    // Uncomment below after installing packages:
    /*
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        return null;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: options.quality || 0.8,
        base64: false,
      });

      if (result.canceled || !result.assets?.[0]) {
        return null;
      }

      const asset = result.assets[0];
      let processedImage = asset;

      // Resize if needed
      if (options.maxWidth || options.maxHeight) {
        processedImage = await this.resizeImage(asset, {
          maxWidth: options.maxWidth,
          maxHeight: options.maxHeight,
          compress: options.compress,
        });
      }

      return {
        uri: processedImage.uri,
        width: processedImage.width,
        height: processedImage.height,
        type: processedImage.type,
      };
    } catch (error) {
      console.error('Error picking image from camera:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
      return null;
    }
    */
  },

  async pickImageFromLibrary(options: ImageUploadOptions = {}): Promise<ImagePickerResult | null> {
    console.log('Photo library picker not available. Install expo-image-picker package.');
    return null;

    // Uncomment below after installing packages:
    /*
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: options.quality || 0.8,
        base64: false,
      });

      if (result.canceled || !result.assets?.[0]) {
        return null;
      }

      const asset = result.assets[0];
      let processedImage = asset;

      // Resize if needed
      if (options.maxWidth || options.maxHeight) {
        processedImage = await this.resizeImage(asset, {
          maxWidth: options.maxWidth,
          maxHeight: options.maxHeight,
          compress: options.compress,
        });
      }

      return {
        uri: processedImage.uri,
        width: processedImage.width,
        height: processedImage.height,
        type: processedImage.type,
      };
    } catch (error) {
      console.error('Error picking image from library:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
      return null;
    }
    */
  },

  async showImagePicker(options: ImageUploadOptions = {}): Promise<ImagePickerResult | null> {
    return new Promise((resolve) => {
      Alert.alert(
        'Select Image',
        'Image picker not configured. Install expo-image-picker package.',
        [
          {
            text: 'OK',
            onPress: () => resolve(null),
          },
        ]
      );
    });

    // Uncomment below after installing packages:
    /*
    return new Promise((resolve) => {
      Alert.alert(
        'Select Image',
        'Choose how you want to select an image',
        [
          {
            text: 'Camera',
            onPress: async () => {
              const result = await this.pickImageFromCamera(options);
              resolve(result);
            },
          },
          {
            text: 'Photo Library',
            onPress: async () => {
              const result = await this.pickImageFromLibrary(options);
              resolve(result);
            },
          },
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => resolve(null),
          },
        ],
        { cancelable: false }
      );
    });
    */
  },

  async resizeImage(
    image: any, // ImagePicker.ImagePickerAsset
    options: {
      maxWidth?: number;
      maxHeight?: number;
      compress?: boolean;
    }
  ): Promise<any> {
    console.log('Image resize not available. Install expo-image-manipulator package.');
    return image;

    // Uncomment below after installing packages:
    /*
    try {
      const { maxWidth = 1024, maxHeight = 1024, compress = true } = options;

      const actions: ImageManipulator.Action[] = [];

      // Calculate resize dimensions
      if (image.width > maxWidth || image.height > maxHeight) {
        const aspectRatio = image.width / image.height;
        let newWidth = maxWidth;
        let newHeight = maxHeight;

        if (aspectRatio > 1) {
          // Landscape
          newHeight = maxWidth / aspectRatio;
        } else {
          // Portrait
          newWidth = maxHeight * aspectRatio;
        }

        actions.push({
          resize: {
            width: Math.round(newWidth),
            height: Math.round(newHeight),
          },
        });
      }

      const result = await ImageManipulator.manipulateAsync(
        image.uri,
        actions,
        {
          compress: compress ? 0.8 : 1,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      return {
        ...image,
        uri: result.uri,
        width: result.width,
        height: result.height,
      };
    } catch (error) {
      console.error('Error resizing image:', error);
      return image;
    }
    */
  },

  async createThumbnail(
    imageUri: string,
    size: number = 200
  ): Promise<string | null> {
    console.log('Thumbnail creation not available. Install expo-image-manipulator package.');
    return null;

    // Uncomment below after installing packages:
    /*
    try {
      const result = await ImageManipulator.manipulateAsync(
        imageUri,
        [
          {
            resize: {
              width: size,
              height: size,
            },
          },
        ],
        {
          compress: 0.7,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      return result.uri;
    } catch (error) {
      console.error('Error creating thumbnail:', error);
      return null;
    }
    */
  },

  // Utility function to get image dimensions (Web only)
  getImageSize(uri: string): Promise<{ width: number; height: number } | null> {
    if (Platform.OS === 'web') {
      return new Promise((resolve) => {
        // @ts-ignore - window is available in web environment
        const img = new window.Image();
        img.onload = () => {
          resolve({
            width: img.width,
            height: img.height,
          });
        };
        img.onerror = () => {
          resolve(null);
        };
        img.src = uri;
      });
    } else {
      // For native platforms, you'd typically use react-native-image-size
      console.log('Image size detection not available on native platforms without additional packages.');
      return Promise.resolve(null);
    }
  },

  // Format file size for display
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },
};

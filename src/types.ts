import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type Address = {
  name: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
};

export type RootStackParamList = {
  AddAddressScreen: { newAddress?: Address } | undefined;
  DeliveryAddressScreen: undefined;
};

export type DeliveryAddressScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DeliveryAddressScreen'
>;

export type AddDeliveryAddressScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AddAddressScreen'
>;

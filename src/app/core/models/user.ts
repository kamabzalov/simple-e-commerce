export interface User {
  address: Address;
  id: number;
  email: string;
  username: string;
  name: FullName;
  fullName: string;
  phone: string;
}

interface FullName {
  firstname: string;
  lastname: string;
}

interface Address {
  geolocation: {
    lat: string;
    long: string;
  };
  city: string;
  street: string;
  number: number;
  zipcode: string;
}

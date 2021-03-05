export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string
  },
  phone: string,
  website: string,
  company: {
    name: string,
    bs: string
  }
};

export interface Album {
  userId: number,
  id: number,
  title: string
}

export interface Photo {
  albumId: number,
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string
}

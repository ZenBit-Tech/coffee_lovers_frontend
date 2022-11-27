export interface User {
  id: number;
  email: string;
  name: Name;
  picture: Picture;
}

interface Picture {
  large: string;
}

interface Name {
  last: string;
}

export interface User {
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

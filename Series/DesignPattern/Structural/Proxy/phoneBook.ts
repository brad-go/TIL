interface User {
  name: string;
  phoneNumber: string;
}

const users: User[] = [
  {
    name: "Brad",
    phoneNumber: "010-1111-1111",
  },
  {
    name: "Anne",
    phoneNumber: "010-1234-1234",
  },
  {
    name: "Albert",
    phoneNumber: "010-1234-5678",
  },
];

interface PhoneBook {
  getPhoneNumber(name: string, callbackfn: Function): void;
}

class RealPhoneBook {
  private dictionary: Map<string, string> = new Map<string, string>();

  addPhoneNumber({ name, phoneNumber }: User): void {
    this.dictionary.set(name, phoneNumber);
  }

  getPhoneNumber(name: string, callbackfn: Function) {
    callbackfn(this.dictionary.get(name));
  }
}

class ProxyPhoneBook {
  private cache = new Map<string, string>();
  private viewCount = 0;

  constructor(private phoneBook: RealPhoneBook) {}

  getPhoneNumber(name: string, callbackfn: Function) {
    this.viewCount++;

    if (this.cache.get(name)) {
      console.log(`${this.viewCount}th request. ${name}:`);
      callbackfn(this.cache.get(name));
    } else {
      this.phoneBook.getPhoneNumber(name, (phoneNumber: string) => {
        console.log(`First request. ${name}:`);
        this.cache.set(name, phoneNumber);
        callbackfn(phoneNumber);
      });
    }
  }

  getViewCount() {
    return this.viewCount;
  }
}

function client(phoneBook: PhoneBook, name: string) {
  phoneBook.getPhoneNumber(name, (phoneNumber: string) =>
    console.log(phoneNumber)
  );
}

const realPhoneBook = new RealPhoneBook();
users.forEach((user) => realPhoneBook.addPhoneNumber(user));

client(realPhoneBook, "Brad");

const proxyPhoneBook = new ProxyPhoneBook(realPhoneBook);

client(proxyPhoneBook, "Brad");
client(proxyPhoneBook, "Brad");
client(proxyPhoneBook, "Albert");

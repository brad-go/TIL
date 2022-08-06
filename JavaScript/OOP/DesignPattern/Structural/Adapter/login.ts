/**
 * Target에 해당
 * username과 password 정보를 알아낼 수 있는 인터페이스
 */
interface UserDetails {
  getUsername(): string;
  getPassword(): string;
}

/**
 * Target에 해당
 * username에 해당하는 UserDetails 유저 정보를 읽어들이는 인터페이스
 */
interface UserDetailService {
  loadUser(username: string): UserDetails;
}

/**
 * Adaptee에 해당
 * 애플리케이션마다 만드는 일반적인 계정
 */
class Account {
  public name: string | undefined;
  public password: string | undefined;
  public email: string | undefined;
}

/**
 * Adaptee에 해당
 * 어플리케이션마다 만드는 일반적인 account service
 */
class AccountService {
  findAccountByUsername(username: string): Account {
    const account = new Account();

    account.name = username;
    account.password = username;
    account.email = username;

    return account;
  }

  createNewAccount(account: Account): void {}
  updateAccount(account: Account): void {}
}

/**
 * Adpater에 해당
 * UserDetailService와 AccountService를 연결
 */
class AccountUserDetailsService implements UserDetailService {
  constructor(private accountService: AccountService) {}

  loadUser(username: string): UserDetails {
    return new AccountUserDetails(
      this.accountService.findAccountByUsername(username)
    );
  }
}

/**
 * Adapter에 해당
 * UserDetails와 Account를 연결
 */
class AccountUserDetails implements UserDetails {
  constructor(private account: Account) {}

  getUsername(): string {
    return this.account.name!;
  }

  getPassword(): string {
    return this.account.password!;
  }
}

/**
 * Clinet에 해당
 * UserDetails와 UserDetailsService로 로그인을 처리하는 핸들러
 * 해당하는 로그인 기능을 처리해준는 LoginHandler는 UserDetails와 UserDetailService라는 정해진
 * 규격의 인터페이스를 사용하고 있다.
 * Account와 AccountService는 Adaptee에 해당하며, 어댑터를 만들어서 이 상호호환되지 않는
 * 두 클래스를 연결해줘야 한다.
 */
class LoginHandler {
  constructor(private userDetailService: UserDetailService) {}

  login(username: string, password: string): string {
    const userDetails = this.userDetailService.loadUser(username);

    if (userDetails.getPassword() === password) {
      return userDetails.getUsername();
    } else {
      throw new Error("로그인 정보가 유효하지 않습니다.");
    }
  }
}

const accountService: AccountService = new AccountService();
const userDetailsService: UserDetailService = new AccountUserDetailsService(
  accountService
);
const loginHandler = new LoginHandler(userDetailsService);
const login: string = loginHandler.login("brad", "brad");
console.log(login); // brad

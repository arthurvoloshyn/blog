## Entity User

### Entity User

---

- types  
  `Role` - the user can have one or more of the roles

  > `[ ADMIN, MANAGER ]` - have access to secure routes, admin panel.  
  > `USER` - does not have access to protected routes.

  `User` - User type

  ```typescript
  interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: role[];
  }
  ```

  ``UserSchema` - The type used in the reduser

```typescript
interface UserSchema {
  authData?: User;
  _inited: boolean;
}
```

- slice  
  `userReducer` - the reducer required for the user authorization logic

- selectors

> `isAdminRole` - return true if the role is Admin  
> `isManagerRole` - return true if the role is Manager  
> `getRoles` - Selector for getting user roles  
> `getUserInited` - Checks if the user is authorized
> `getUserAuthData` - gets user data

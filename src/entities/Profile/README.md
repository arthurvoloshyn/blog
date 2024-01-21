## Entity Profile

Entity describes user data, selected currency, country, city, avatar, etc.

---

- types  
  `Profile` - Type describing the profile entity

```typescript
interface Profile {
  first?: string;
  lastname?: string;
  age?: string;
  currency?: Currency;
  country?: Country;
  city?: string;
  username?: string;
  avatar?: string;
  id?: string;
}
```

- components  
  `ProfileCard` - a profile card where you can view and edit information about the user.

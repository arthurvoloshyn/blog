## Entity Rating

A rating entity that contains a rating and optionally a review.

---

- types  
  `Rating` - Entity type

```typescript
interface Rating {
  rate: number;
  feedback?: string;
}
```

- components  
  `RatingCard` - Rating Card

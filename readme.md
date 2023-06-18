# Digital Cow Hut Backend Assignment

## API:

```http
 https://cow-hut-backend-ten.vercel.app
```

### Application Routes:

#### User

- api/v1/auth/signup (POST)
- api/v1/users (GET)
- api/v1/users/648df5091d22a20d7fcc1582 (Single GET)
- api/v1/users/648df5091d22a20d7fcc1582 (PATCH)
- api/v1/users/648df5091d22a20d7fcc1582 (DELETE) Include an id that is saved in your database

#### Cows

- api/v1/cows (POST)
- api/v1/cows (GET)
- api/v1/cows/648f15218445d83cb43ec99e (Single GET)
- api/v1/cows/648f15218445d83cb43ec99e (PATCH)
- api/v1/cows/648f15218445d83cb43ec99e (DELETE)

### Pagination and Filtering routes of Cows

- api/v1/cows?pag=1&limit=10
- api/v1/cows?sortBy=price&sortOrder=asc
- api/v1/cows?minPrice=6000&maxPrice=9000
- api/v1/cows?location=Rajshahi
- api/v1/cows?searchTerm=Dairy

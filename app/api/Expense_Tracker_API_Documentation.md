# 📘 Expense Tracker API Documentation

Base URL (local): `http://localhost:3000`

---

## 📂 GET `/api/expenses/monthly`

### 🔹 Description:

Fetches all expenses that were updated in the **current month**.

### ✅ Method:

`GET`

### 🔄 Response (200 OK):

```json
{
  "data": [
    {
      "id": 4,
      "description": "Medicine for Maa",
      "amount": 902,
      "updated_at": "2025-05-03T17:23:35.976267+00:00",
      "expense_category": 11
    },
    {
      "id": 6,
      "description": "Office Auto",
      "amount": 280,
      "updated_at": "2025-05-03T17:26:03.045379+00:00",
      "expense_category": 13
    }
  ]
}
```

### ❗ Errors:

- `500 Internal Server Error` – When Supabase query fails.

---

## 📂 GET `/api/expenses-category/all`

### 🔹 Description:

Returns **all predefined expense categories**.

### ✅ Method:

`GET`

### 🔄 Response (200 OK):

```json
{
  "data": [
    {
      "id": 1,
      "title": "Rent",
      "description": "Rental expense for Bengaluru house",
      "max_amount_per_month": 67000,
      "updated_at": "2025-05-03T16:55:17.412873+00:00"
    },
    {
      "id": 2,
      "title": "Home Loan",
      "description": "Home loan expense for Konnagar flat (700 + 23300)",
      "max_amount_per_month": 24000,
      "updated_at": "2025-05-03T16:57:42.622243+00:00"
    }
  ]
}
```

### ❗ Errors:

- `500 Internal Server Error` – When fetching fails or returns null.

---

## 🛠 Notes:

- API is built using **Next.js App Router API routes**.
- Data is served from **Supabase**.
- Filtering logic for `/expenses/monthly` is handled server-side using date matching.

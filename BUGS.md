# Bugs found

I found few issues in the app while testing it with the app description.

---

## Bug 1

**How to reproduce:** Open the app and check the expense list. The text says Newest first but the first item is an older expense and the newer one is lower down.

**What is wrong:** The list is sorted from oldest to newest instead of newest to oldest. This is opposite of what the app says and what users expect.

**What I changed:** I changed the sorting so the newest expenses show first.

---

## Bug 2

**How to reproduce:** Make a bill like $10 split equally among 3 people.

**What is wrong:** The app divides each share and rounds them one by one. That makes the total become $9.99 or $10.01 sometimes, which is wrong. The split should still add up to the actual bill amount.

**What I changed:** I fixed the equal split logic so the amounts add up properly and do not lose or create money.

---

## Bug 3

**How to reproduce:** Make a bill where one person pays for someone else, like a cab paid by Alice but Bob is the one who used it and Alice is not in the split.

**What is wrong:** The payer is not getting fully reimbursed. The app subtracts only a part of the amount from their balance, so the running total becomes wrong.

**What I changed:** I fixed the balance logic so the person who paid gets the full amount back if they were not part of the cost share.

---

## Bug 4

**How to reproduce:** Use filter or sort in the expense list and then try to delete or edit an expense.

**What is wrong:** The app is using the index of the sorted/filtered list, not the actual expense item. Because of that, it can delete or update the wrong expense from the original data.

**What I changed:** I fixed it by making sure actions target the right expense instead of the wrong row after sorting or filtering.

---

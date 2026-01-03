# Angular-app

Enostavna Angular + PrimeNG aplikacija za evidenco študentov.

Vsebuje:
- dodajanje študenta (osnovni podatki + predmeti)
- urejanje študenta (samo predmeti)
- brisanje študenta
- pregled vseh študentov v tabeli (paginacija 20/stran)
- `/overview` je lazy-loaded

---

## Zagon
- Node.js + npm
- `npm install`
- `npm start` (ali `ng serve`)
- `npm run build`
- `http://localhost:4200`

---

## Uporaba
- tabela prikazuje vse študente (20 na stran)
- **Dodaj študenta** odpre dialog z validacijami
- **Edit courses** ureja samo predmete
- **Delete** izbriše študenta po potrditvi

---

## Struktura
- `src/app/features/overview`  
  overview stran + tabela + dialogi
- `src/app/services/student.store.ts`  
  store (signals) + CRUD logika
- podatki so v pomnilniku (brez HTTP)

---

## Zakaj tako
- lazy-load `/overview`: zahteva naloge + ločen feature
- store v aplikaciji: dovolj za simulacijo backend-a, manj kompleksnosti
- reactive forms: validacije in kontroliran vnos
- PrimeNG: tabela, dialog, toast, confirm
- styling: približek priloženi sliki (temen header + “card” vrstice), brez dodatnih funkcij

# Clone Pages from one HubSpot account to another HubSpot account

<img src="https://img.shields.io/badge/nodejs-v16.14.2-brightgreen" /> <img src="https://img.shields.io/badge/dotenv-16.0.3-red" />

- Project to clone **Landing Pages** and **Website Pages** from one HubSpot account to another HubSpot account.
- With this project, you can clone a single page.

## Installation

1. Download the project from _git_ to your computer.
2. Use [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) to install packages for better performance.
3. Create **Private Apps** in the HubSpot accounts where you want to perform the migration with this permission: `STANDARD SCOPE: content`.
4. Edit the **prod.env** file following the template provided.
5. After editing **prod.env** with the required data, run this command in the terminal:
6. `yarn install`

## Deploy
Terminal commands:

- `yarn website` → used to upload the copy of **Website Pages**.
- `yarn landing` → used to upload the copy of **Landing Pages**.

## Editing the _prod.env_ File

The Private Apps must have this permission: `STANDARD SCOPE: content`.

```prod.env
PAGE_ID = ID of the page you want to clone
PAGE_LANGUAGE_ID=ID of the imported main page
TOKEN_FROM = Private App token that has the Landing you want to copy
TOKEN_TO = Private App token of the project that will receive the new Landing
```

## Language Variation Import

When importing a **language variation of a page**, the process must be done in two steps.

### 1. Import the main page

First, import the **main page in its original language**.

Example:

- Main page: **EN**
- Desired variation: **FR**

After importing the main page, copy the **ID of the newly created page**.

---

### 2. Configure variables to import the language variation

With the main page ID available:

1. Add the ID to the `.env` file using the variable:

```env
PAGE_LANGUAGE_ID=<ID of the imported main page>
```

Set the PAGE_ID variable with the ID of the language variation page you want to import.
```env
PAGE_ID=<ID of the FR page>
```

When PAGE_LANGUAGE_ID is filled, the script will treat the import as a language variation of the main page.

3. Cleanup after the import

After completing the variation import:
Remove the value of PAGE_LANGUAGE_ID from the .env file.

The presence of PAGE_LANGUAGE_ID works as a trigger indicating that the import should be handled as a language variation. If it remains set, other imports may be incorrectly linked as language variations.

## Important Notice

For the copy to work, you need to keep in mind a few things:

- The theme and modules must already be correct and synchronized across the associated accounts.
- The "UPDATED BY" column in the Pages and/or Websites list will display the name of the creator of the Private App.
- The Page and/or Website URL will be set to the default URL of the source HubSpot account.

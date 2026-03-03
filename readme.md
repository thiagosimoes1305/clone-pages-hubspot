# Trickster : Clone Pages from one HubSpot account to another HubSpot account

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

### Deploy
Terminal commands:

- `yarn website` → used to upload the copy of **Website Pages**.
- `yarn landing` → used to upload the copy of **Landing Pages**.

## Editing the _prod.env_ File

The Private Apps must have this permission: `STANDARD SCOPE: content`

```env
PAGE_ID = ID of the page you want to clone
TOKEN_FROM = Private App token that has the Landing you want to copy
TOKEN_TO = Private App token of the project that will receive the new Landing
```

## Important Notice

For the copy to work, you need to keep in mind a few things:

- The theme and modules must already be correct and synchronized across the associated accounts.
- The "UPDATED BY" column in the Pages and/or Websites list will display the name of the creator of the Private App.
- The Page and/or Website URL will be set to the default URL of the source HubSpot account.

[https://github.com/thiagosimoes1305](https://github.com/thiagosimoes1305)

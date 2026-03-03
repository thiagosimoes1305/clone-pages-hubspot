module.exports = {
  consoleStart: function (text) {
    console.log('')
    console.log('\x1b[32m 🚀 Start: Create ' + text + ' in another HubSpot account. \x1b[0m')
    console.log('')
  },
  consoleErrorPageID: function () {
    console.log('')
    console.log('\x1b[31m ❌ Error: Page ID is not found \x1b[0m')
    console.log('')
  },
  consoleGetPageID: function (pageID) {
    console.log('\x1b[33m  \u2714 Get page ID ' + pageID + '... \x1b[0m')
  },
  consoleAccessing: function (name) {
    console.log('\x1b[33m  \u2714 Accessing the HubSpot account to create the new page... \x1b[0m')
    console.log('\x1b[33m  \u2714 Saving the ' + name + ' page in the new Hubspot account... \x1b[0m')
  },
  consoleErrorPermission: function (error) {
    console.log('')
    console.log('\x1b[31m ❌ Error: ' + error + ' \x1b[0m')
    console.log('')
  },
  consoleEnd: function (text, name) {
    console.log('')
    console.log('\x1b[32m 🎉 Done: ' + text + ' ' + name + ' created successfully! 🎉 \x1b[0m')
    console.log('')
  }
}

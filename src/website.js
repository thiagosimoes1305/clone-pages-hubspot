const http = require('https')
const helper = require('./helper/index.js')

require('dotenv').config({ path: './prod.env' })

const pageID = process.env.PAGE_ID
const tokenFrom = process.env.TOKEN_FROM
const tokenTo = process.env.TOKEN_TO

const options = {
  method: 'GET',
  hostname: 'api.hubapi.com',
  port: null,
  path: '/cms/v3/pages/site-pages/' + pageID,
  headers: {
    accept: 'application/json',
    authorization: 'Bearer ' + tokenFrom
  }
}

const optionsCreate = {
  method: 'POST',
  hostname: 'api.hubapi.com',
  port: null,
  path: '/cms/v3/pages/site-pages',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: 'Bearer ' + tokenTo
  }
}

helper.consoleStart('Website Page')

const req = http.request(options, function (res) {
  let chunks = []

  res.on('data', function (chunk) {
    chunks.push(chunk)
  })

  res.on('end', function () {
    const body = Buffer.concat(chunks)
    const bodyString = body.toString()

    if (bodyString == '') {
      helper.consoleErrorPageID()
    }
    else {
      helper.consoleGetPageID(pageID)

      const bodyObject = JSON.parse(bodyString)

      if (
        process.env.PAGE_LANGUAGE_ID &&
        bodyObject.language &&
        bodyObject.language.toLowerCase() !== 'pt' &&
        bodyObject.language.toLowerCase() !== 'pt-br'
      ) {
        bodyObject.translatedFromId = String(process.env.PAGE_LANGUAGE_ID)
      }
      
      const objGlobal = {
        id: bodyObject.id,
        slug: bodyObject.slug,
        contentGroupId: bodyObject.contentGroupId || '',
        campaign: bodyObject.campaign || '',
        categoryId: bodyObject.categoryId,
        state: bodyObject.state,
        templatePath: bodyObject.templatePath,
        name: bodyObject.name,
        mabExperimentId: bodyObject.mabExperimentId || '',
        authorName: bodyObject.authorName || '',
        createdById: bodyObject.createdById,
        updatedById: bodyObject.updatedById,
        //domain: bodyObject.domain,
        subcategory: bodyObject.subcategory,
        folderId: bodyObject.folderId || '',
        language: bodyObject.language || '',
        translatedFromId: bodyObject.translatedFromId || '',
        translations: bodyObject.translations || [],
        dynamicPageHubDbTableId: bodyObject.dynamicPageHubDbTableId || '',
        dynamicPageDataSourceType: bodyObject.dynamicPageDataSourceType || 0,
        dynamicPageDataSourceId: bodyObject.dynamicPageDataSourceId || '',
        pageRedirected: bodyObject.pageRedirected,
        url: bodyObject.url,
        password: bodyObject.password || '',
        currentlyPublished: bodyObject.currentlyPublished || true,
        publishImmediately: bodyObject.publishImmediately,
        linkRelCanonicalUrl: bodyObject.linkRelCanonicalUrl || '',
        archivedInDashboard: bodyObject.archivedInDashboard,
        currentState: bodyObject.currentState || 'AUTOMATED',
        pageExpiryEnabled: false,
        pageExpiryRedirectId: bodyObject.pageExpiryRedirectId || 0,
        pageExpiryRedirectUrl: bodyObject.pageExpiryRedirectUrl || '',
        pageExpiryDate: bodyObject.pageExpiryDate || 0,
        contentTypeCategory: bodyObject.contentTypeCategory || '0',
        layoutSections: bodyObject.layoutSections || {},
        htmlTitle: bodyObject.htmlTitle || '',
        includeDefaultCustomCss: bodyObject.includeDefaultCustomCss || true,
        enableLayoutStylesheets: bodyObject.enableLayoutStylesheets || true,
        enableDomainStylesheets: bodyObject.enableDomainStylesheets || true,
        featuredImageAltText: bodyObject.featuredImageAltText || '',
        attachedStylesheets: bodyObject.attachedStylesheets || [],
        metaDescription: bodyObject.metaDescription || '',
        headHtml: bodyObject.headHtml || '',
        footerHtml: bodyObject.footerHtml || '',
        featuredImage: bodyObject.featuredImage || '',
        useFeaturedImage: bodyObject.useFeaturedImage || true,
        publicAccessRulesEnabled: false,
        publicAccessRules: [],
        publishDate: bodyObject.publishDate,
        created: bodyObject.createdAt,
        updated: bodyObject.updatedAt,
        archivedAt: ''
      }

      const reqCreate = http.request(optionsCreate, function (resCreate) {
        let chunksCreate = []

        resCreate.on('data', function (chunk) {
          chunksCreate.push(chunk)
        })

        resCreate.on('end', function () {
          const bodyCreate = Buffer.concat(chunksCreate)
          const bodyCreateString = bodyCreate.toString()
          const bodyCreateObject = JSON.parse(bodyCreateString)

          helper.consoleGetPageID(bodyObject.name)

          if (bodyCreateObject.status == 'error') {
            helper.consoleErrorPermission(bodyCreateObject.message)
          } else {
            helper.consoleEnd('Website Page', bodyObject.name)
          }
        })
      })

      reqCreate.write(JSON.stringify(objGlobal))
      reqCreate.end()
    }
  })
})

req.end()

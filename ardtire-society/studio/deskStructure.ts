import type { StructureResolver } from 'sanity/structure'
import { CogIcon, DocumentIcon, UsersIcon, BookIcon, ClipboardIcon, ImageIcon } from '@sanity/icons'

const singleton = (S: any, title: string, id: string, schemaType: string, icon?: any) =>
  S.listItem().title(title).icon(icon).child(S.document().schemaType(schemaType).documentId(id))

const singletonPage = (S: any, title: string, section: string, key: string) =>
  singleton(S, title, `sitePage.${section}.${key}`, 'sitePage', DocumentIcon)

const publicationsByType = (S: any, title: string, type: string) =>
  S.listItem()
    .title(title)
    .icon(BookIcon)
    .child(
      S.documentList()
        .title(title)
        .schemaType('contentPost')
        .filter('_type == "contentPost" && type == $type')
        .params({ type })
        .defaultOrdering([{ field: 'date', direction: 'desc' }]),
    )

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      singleton(S, 'Site Settings', 'siteSettings', 'siteSettings', CogIcon),

      S.divider(),

      S.listItem()
        .title('Information Pages')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Information Pages')
            .items([
              singletonPage(S, 'Information Hub', 'information', 'hub'),
              S.divider(),
              S.listItem()
                .title('Crown')
                .child(
                  S.list()
                    .title('Crown')
                    .items([
                      singletonPage(S, 'Crown', 'crown', 'crown'),
                      singletonPage(S, 'Realm', 'crown', 'realm'),
                      singletonPage(S, 'Succession', 'crown', 'succession'),
                      singletonPage(S, 'Council', 'crown', 'council'),
                      singletonPage(S, 'Instruments', 'crown', 'instruments'),
                      singletonPage(S, 'Symbols', 'crown', 'symbols'),
                      singletonPage(S, 'Honours', 'crown', 'honours'),
                    ]),
                ),
              S.listItem()
                .title('Royal House')
                .child(
                  S.list()
                    .title('Royal House')
                    .items([
                      singletonPage(S, 'Sovereign', 'royalHouse', 'sovereign'),
                      singletonPage(S, 'Household Office', 'royalHouse', 'householdOffice'),
                    ]),
                ),
            ]),
        ),

      S.listItem()
        .title('Transparency Pages')
        .icon(ClipboardIcon)
        .child(
          S.list()
            .title('Transparency')
            .items([
              singletonPage(S, 'Transparency Hub', 'transparency', 'hub'),
              singletonPage(S, 'Governance', 'transparency', 'governance'),
              singletonPage(S, 'Finances', 'transparency', 'finances'),
              singletonPage(S, 'Policies', 'transparency', 'policies'),
              singletonPage(S, 'Requests', 'transparency', 'requests'),
            ]),
        ),

      S.listItem()
        .title('Media Pages')
        .icon(ImageIcon)
        .child(
          S.list()
            .title('Media')
            .items([
              singletonPage(S, 'Media Hub', 'media', 'hub'),
              singletonPage(S, 'Accreditation', 'media', 'accreditation'),
            ]),
        ),

      S.listItem()
        .title('Legal Pages')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Legal')
            .items([
              singletonPage(S, 'Privacy', 'legal', 'privacy'),
              singletonPage(S, 'Accessibility', 'legal', 'accessibility'),
              singletonPage(S, 'Copyright', 'legal', 'copyright'),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Publications')
        .icon(BookIcon)
        .child(
          S.list()
            .title('Publications')
            .items([
              publicationsByType(S, 'News', 'news'),
              publicationsByType(S, 'Statements', 'statements'),
              publicationsByType(S, 'Speeches', 'speeches'),
              publicationsByType(S, 'Messages', 'messages'),
            ]),
        ),

      S.listItem()
        .title('Registers')
        .icon(BookIcon)
        .child(
          S.list()
            .title('Registers')
            .items([
              S.documentTypeListItem('instrument').title('Instrument Register'),
              S.documentTypeListItem('diaryEntry').title('Royal Diary'),
              S.documentTypeListItem('recordDay').title('Official Record'),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Member Directory')
        .icon(UsersIcon)
        .child(
          S.list()
            .title('Directory')
            .items([
              S.documentTypeListItem('person').title('People'),
              S.documentTypeListItem('role').title('Roles'),
              S.documentTypeListItem('roleAssignment').title('Role Assignments'),
            ]),
        ),

      S.listItem()
        .title('Downloads & Assets')
        .icon(ImageIcon)
        .child(
          S.list()
            .title('Downloads & Assets')
            .items([
              S.documentTypeListItem('downloadItem').title('Download Items'),
              S.documentTypeListItem('mediaAsset').title('Media Assets'),
              S.documentTypeListItem('honour').title('Honours'),
              S.documentTypeListItem('symbolMark').title('Symbol Marks'),
            ]),
        ),
    ])

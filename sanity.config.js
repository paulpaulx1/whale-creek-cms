import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure' // Changed from deskTool
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes' // or './schemas' depending on your folder

export default defineConfig({
  name: 'default',
  title: 'Whale Creek Construction',

  projectId: '95dw463o', // You'll get this from `npx sanity debug --secrets`
  dataset: 'production',

  plugins: [
    structureTool({ // Changed from deskTool
      structure: (S) =>
        S.list()
          .title('Content Management')
          .items([
            S.listItem()
              .title('⭐ Featured Projects')
              .child(
                S.documentList()
                  .title('Featured Projects')
                  .filter('_type == "project" && featured == true')
              ),
            S.divider(),
            S.listItem()
              .title('🏗️ All Projects')
              .child(
                S.documentList()
                  .title('All Projects')
                  .filter('_type == "project"')
              ),
            S.divider(),
            S.listItem()
              .title('🔨 Millwork Projects')
              .child(
                S.documentList()
                  .title('Millwork Projects')
                  .filter('_type == "project" && category == "millwork"')
              ),
            S.listItem()
              .title('🏠 Residential Projects')
              .child(
                S.documentList()
                  .title('Residential Projects')
                  .filter('_type == "project" && category == "residential"')
              ),
            S.listItem()
              .title('🏢 Commercial Projects')
              .child(
                S.documentList()
                  .title('Commercial Projects')
                  .filter('_type == "project" && category == "commercial"')
              )
          ])
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
import {defineConfig} from 'sanity'
  import {structureTool} from 'sanity/structure'
  import {visionTool} from '@sanity/vision'
  import {schemaTypes} from './schemaTypes'
  
  export default defineConfig({
    name: 'default',
    title: 'Whale Creek Construction',
  
    projectId: '95dw463o',
    dataset: 'production',
  
    plugins: [
      structureTool({
        structure: (S) =>
          S.list()
            .title('Content Management')
            .items([
              // Blog Posts Section
              S.listItem()
                .title('📝 Blog Posts')
                .child(
                  S.list()
                    .title('Blog Management')
                    .items([
                      S.listItem()
                        .title('⭐ Featured Posts')
                        .child(
                          S.documentList()
                            .title('Featured Blog Posts')
                            .filter('_type == "blogPost" && featured == true')
                        ),
                      S.listItem()
                        .title('📚 All Posts')
                        .child(
                          S.documentList()
                            .title('All Blog Posts')
                            .filter('_type == "blogPost"')
                        ),
                      S.divider(),
                      S.listItem()
                        .title('🔨 Millwork Posts')
                        .child(
                          S.documentList()
                            .title('Millwork Posts')
                            .filter('_type == "blogPost" && category == "millwork"')
                        ),
                      S.listItem()
                        .title('💡 Tips & Tricks')
                        .child(
                          S.documentList()
                            .title('Construction Tips')
                            .filter('_type == "blogPost" && category == "tips"')
                        ),
                      S.listItem()
                        .title('🏆 Project Spotlights')
                        .child(
                          S.documentList()
                            .title('Project Spotlights')
                            .filter('_type == "blogPost" && category == "spotlights"')
                        )
                    ])
                ),
              
              S.divider(),
              
              // Projects Section
              S.listItem()
                .title('🏗️ Projects')
                .child(
                  S.list()
                    .title('Project Management')
                    .items([
                      S.listItem()
                        .title('⭐ Featured Projects')
                        .child(
                          S.documentList()
                            .title('Featured Projects')
                            .filter('_type == "project" && featured == true')
                        ),
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
                )
            ])
      }),
      visionTool()
    ],
  
    schema: {
      types: schemaTypes,
    },
  })
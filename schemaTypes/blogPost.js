// schemas/blogPost.js - Add this to your Sanity project
export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Blog Post Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Custom Millwork', value: 'millwork'},
          {title: 'Construction Tips', value: 'tips'},
          {title: 'Project Spotlights', value: 'spotlights'},
          {title: 'Industry News', value: 'news'},
          {title: 'Behind the Scenes', value: 'behind-scenes'},
          {title: 'Tool Reviews', value: 'tools'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
      description: 'Brief summary for blog listings and SEO',
    },
    {
      name: 'content',
      title: 'Blog Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{name: 'href', type: 'url', title: 'URL'}],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              options: {isHighlighted: true},
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        {
          type: 'object',
          name: 'callout',
          title: 'Callout Box',
          fields: [
            {
              name: 'text',
              type: 'text',
              title: 'Callout Text',
            },
            {
              name: 'type',
              type: 'string',
              title: 'Callout Type',
              options: {
                list: [
                  {title: 'Pro Tip', value: 'tip'},
                  {title: 'Warning', value: 'warning'},
                  {title: 'Info', value: 'info'},
                  {title: 'Quote', value: 'quote'},
                ],
              },
            },
          ],
        },
      ],
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for SEO and accessibility',
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Should this post appear in the featured section?',
      initialValue: false,
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      description: 'Estimated reading time in minutes',
    },
    {
      name: 'relatedProjects',
      title: 'Related Projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'project'}],
        },
      ],
      description: 'Link to related projects from the gallery',
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Custom title for search engines (optional)',
      validation: (Rule) => Rule.max(60),
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      description: 'Custom description for search engines (optional)',
      validation: (Rule) => Rule.max(160),
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'featuredImage',
      featured: 'featured',
      status: 'status',
    },
    prepare(selection) {
      const {title, category, media, featured, status} = selection
      const statusEmoji = status === 'published' ? '✅' : status === 'archived' ? '📦' : '📝'
      return {
        title: `${statusEmoji} ${title} ${featured ? '⭐' : ''}`,
        subtitle: `${category} • Blog Post`,
        media: media,
      }
    },
  },
}

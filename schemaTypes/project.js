export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description:
        'Optional: Set order (1, 2, 3...). Ordered projects appear first. Leave blank to show after ordered projects.',
      validation: (Rule) => Rule.min(0), // No .required()
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Custom Millwork', value: 'millwork'},
          {title: 'Residential Construction', value: 'residential'},
          {title: 'Commercial Construction', value: 'commercial'},
          {title: 'Custom Cabinetry', value: 'cabinetry'},
          {title: 'Renovation & Remodeling', value: 'renovation'},
          {title: 'CNC Manufacturing', value: 'cnc'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
      description: 'Brief description for gallery cards',
    },
    {
      name: 'longDescription',
      title: 'Detailed Description',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Longer description for project detail page',
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Should this project appear in the featured section?',
      initialValue: false,
    },
    {
      name: 'images',
      title: 'Project Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'asset',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
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
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(10),
    },
    {
      name: 'completedDate',
      title: 'Completion Date',
      type: 'date',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      placeholder: 'Indianapolis, IN',
    },
    {
      name: 'client',
      title: 'Client Name',
      type: 'string',
      description: 'Optional - only if client approves public display',
    },
    {
      name: 'video',
      title: 'Project Video',
      type: 'mux.video',
      description:
        'Optional: Upload drone footage or project video. Will replace hero image if added.',
    },
    {
      name: 'projectValue',
      title: 'Project Value Range',
      type: 'string',
      options: {
        list: [
          {title: '$5K - $15K', value: '5k-15k'},
          {title: '$15K - $50K', value: '15k-50k'},
          {title: '$50K - $100K', value: '50k-100k'},
          {title: '$100K+', value: '100k+'},
        ],
      },
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
      name: 'materials',
      title: 'Materials Used',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'object',
      fields: [
        {
          name: 'quote',
          title: 'Quote',
          type: 'text',
          rows: 3,
        },
        {
          name: 'author',
          title: 'Author',
          type: 'string',
        },
        {
          name: 'authorTitle',
          title: 'Author Title/Company',
          type: 'string',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'images.0.asset',
      featured: 'featured',
    },
    prepare(selection) {
      const {title, category, media, featured} = selection
      return {
        title: `${title} ${featured ? '⭐' : ''}`,
        subtitle: category,
        media: media,
      }
    },
  },
}

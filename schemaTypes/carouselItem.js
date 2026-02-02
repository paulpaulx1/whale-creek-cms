export default {
  name: 'carouselItem',
  title: 'Hero Carousel Item',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'active',
      title: 'Active',
      description: 'Toggle this off to temporarily hide this slide without deleting it',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
      },
      initialValue: 'image',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mediaSource',
      title: 'Media Source',
      type: 'string',
      options: {
        list: [
          {title: 'Upload File', value: 'file'},
          {title: 'External URL', value: 'url'},
        ],
        layout: 'radio',
      },
      initialValue: 'file',
      validation: (Rule) => Rule.required(),
    },
    // Image - File Upload
    {
      name: 'image',
      title: 'Image Upload',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({parent}) => !(parent?.mediaType === 'image' && parent?.mediaSource === 'file'),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (
            context.parent?.mediaType === 'image' &&
            context.parent?.mediaSource === 'file' &&
            !value
          ) {
            return 'Please upload an image file'
          }
          return true
        }),
    },
    // Image - External URL
    {
      name: 'imageUrl',
      title: 'Image URL',
      type: 'url',
      description: 'External URL to the image (e.g., from WordPress)',
      hidden: ({parent}) => !(parent?.mediaType === 'image' && parent?.mediaSource === 'url'),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (
            context.parent?.mediaType === 'image' &&
            context.parent?.mediaSource === 'url' &&
            !value
          ) {
            return 'Please enter an image URL'
          }
          return true
        }),
    },
    {
      name: 'featuredProject',
      title: 'Featured Project (Bottom-Left Card)',
      type: 'reference',
      to: [{type: 'project'}],
      description: 'Optional: Link to a specific project for this slide',
    },
    // Video - File Upload
    {
      name: 'video',
      title: 'Video Upload',
      type: 'file',
      options: {
        accept: 'video/*',
        storeOriginalFilename: true,
      },
      hidden: ({parent}) => !(parent?.mediaType === 'video' && parent?.mediaSource === 'file'),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (
            context.parent?.mediaType === 'video' &&
            context.parent?.mediaSource === 'file' &&
            !value
          ) {
            return 'Please upload a video file'
          }
          return true
        }),
    },
    // Video - External URL
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'External URL to the video (e.g., Vimeo, YouTube or direct link)',
      hidden: ({parent}) => !(parent?.mediaType === 'video' && parent?.mediaSource === 'url'),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (
            context.parent?.mediaType === 'video' &&
            context.parent?.mediaSource === 'url' &&
            !value
          ) {
            return 'Please enter a video URL'
          }
          return true
        }),
    },
    // Poster Image - File Upload
    {
      name: 'posterImage',
      title: 'Poster Image Upload',
      description: 'Image shown while video is loading',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({parent}) => !(parent?.mediaType === 'video' && parent?.mediaSource === 'file'),
    },
    // Poster Image - External URL
    {
      name: 'posterImageUrl',
      title: 'Poster Image URL',
      type: 'url',
      description: 'External URL to poster image for video',
      hidden: ({parent}) => !(parent?.mediaType === 'video' && parent?.mediaSource === 'url'),
    },
    {
      name: 'services',
      title: 'Services (separated by the | symbol in carousel)',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers will appear first in the carousel',
      initialValue: 0,
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      active: 'active',
      order: 'order',
      mediaType: 'mediaType',
      mediaSource: 'mediaSource',
      image: 'image',
      imageUrl: 'imageUrl',
      posterImage: 'posterImage',
      posterImageUrl: 'posterImageUrl',
    },
    prepare({
      title,
      active,
      order,
      mediaType,
      mediaSource,
      image,
      imageUrl,
      posterImage,
      posterImageUrl,
    }) {
      let subtitle = `${active ? 'Active' : 'Inactive'} | Order: ${order} | ${mediaType === 'video' ? 'Video' : 'Image'} (${mediaSource === 'file' ? 'Uploaded' : 'External URL'})`

      // Determine the preview media
      let media = null
      if (mediaType === 'image') {
        media = mediaSource === 'file' ? image : null // Can't preview external URLs in the panel
      } else if (mediaType === 'video') {
        media = mediaSource === 'file' ? posterImage : null
      }

      return {
        title: title || 'Untitled Carousel Item',
        subtitle,
        media,
      }
    },
  },
}

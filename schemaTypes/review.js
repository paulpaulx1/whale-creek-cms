export default {
  name: 'review',
  title: 'Customer Review',
  type: 'document',
  fields: [
    {
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
      initialValue: 5,
    },
    {
      name: 'timeAgo',
      title: 'Time Ago',
      type: 'string',
      description: 'e.g. "2 weeks ago", "5 months ago"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'text',
      title: 'Review Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this review in the carousel',
      initialValue: true,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Rating (Highest First)',
      name: 'ratingDesc',
      by: [{field: 'rating', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'author',
      rating: 'rating',
      featured: 'featured',
      subtitle: 'text',
    },
    prepare({title, rating, featured, subtitle}) {
      return {
        title: `${title} - ${'★'.repeat(rating)}`,
        subtitle: featured
          ? `✓ Featured | ${subtitle?.substring(0, 60)}...`
          : subtitle?.substring(0, 60),
      }
    },
  },
}

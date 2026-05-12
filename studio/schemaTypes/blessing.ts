import {defineField, defineType} from 'sanity'

export const blessing = defineType({
  name: 'blessing',
  title: 'Blessings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle to show this blessing on the website',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'message',
      approved: 'approved',
    },
    prepare({title, subtitle, approved}) {
      return {
        title: `${approved ? '✅' : '⏳'} ${title}`,
        subtitle,
      }
    },
  },
})

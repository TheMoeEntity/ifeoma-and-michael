import {defineField, defineType} from 'sanity'

export const rsvp = defineType({
  name: 'rsvp',
  title: 'RSVPs',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'guests',
      title: 'Number of Guests',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'guests',
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle: subtitle ?? '1 Guest',
      }
    },
  },
})

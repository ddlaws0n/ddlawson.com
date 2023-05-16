import { defineConfig } from 'tinacms';

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main';

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'post',
        label: 'Posts',
        path: 'src/content/blog',
        format: 'mdx',
        defaultItem: () => {
          return {
            author: 'David D Lawson',
            publishDate: new Date().toISOString(),
          };
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'image',
            label: 'Hero Image',
            name: 'image',
            required: false,
          },
          {
            name: 'draft',
            label: 'Draft',
            type: 'boolean',
            required: true,
            description: 'If this is checked the post will not be published',
          },
          {
            type: 'string',
            name: 'author',
            label: 'Author',
            required: true,
            options: ['David D Lawson'],
            ui: {
              component: 'select',
            },
          },
          {
            type: 'datetime',
            name: 'publishDate',
            label: 'Publish Date',
            required: true,
            ui: {
              dateFormat: 'DD MMMM yyyy',
              // timeFormat: 'HH:mm',
            },
          },
          {
            type: 'datetime',
            name: 'lastUpdatedDate',
            label: 'Last Updated',
            required: false,
            ui: {
              dateFormat: 'DD MMMM yyyy',
              // timeFormat: 'HH:mm',
            },
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            required: true,
            ui: {
              validate: (value: string) => {
                if (value?.length > 175) {
                  return 'Title cannot be more than 175 characters long';
                }
              },
            },
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
      },
    ],
  },
});

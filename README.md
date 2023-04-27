# Notion Link Bio

This web app allows you to convert a Notion database into a responsive web design (RWD) page.

## Database Template

To use this app, you can start by creating a database with the following template: [Notion Link Bio Template](https://www.notion.so/made-by-chang/a15facc5bee540fa808ec678ebb49e06?v=2ae2b263b35041a7b9b618b4ffda733a&pvs=4).

The template includes several properties, including:

- Type
- Label
- URL
- Priority
- Image
- Start From
- End At
- Color
- Background

| Row Type   | Label Property | URL Property | Priority Property | Image Uploads                                 | Schedule Properties | Style Properties                            |
|------------|----------------|--------------|-------------------|-----------------------------------------------|---------------------|---------------------------------------------|
| Header     | Yes            | No           | Yes               | Avatar                                        | No                  | Font Color, Background Color                |
| Background | No             | No           | No                | Background Image                              | No                  | Font Color, Background Color                |
| Link       | Yes            | Yes          | Yes               | Thumbnail                                     | Start Date, End Date | Font Color, Background Color                |
| Footer     | No             | Yes          | Yes               | Icon                                          | No                  | Font Color, Background Color                |

## How to Use

1. Create an integration on Notion by going to https://www.notion.com/my-integrations and clicking "Create New Integration." Follow the prompts to name your integration and generate a secret key.

2. Clone this repository and navigate to the project directory in your terminal.

3. Create a .env file in the project directory and add your Notion API secret key as follows:
   ```
   NOTION_INTEGRATION_SECRET=your-secret-key-here
   ```

4. Deploy the application to a hosting service such as Vercel, Heroku, or Netlify.

5. Navigate to the deployed website with Notion database ID in your web browser.
## Credits

This app was created by Yi-Wei Chang and uses the Notion API and Flaticon.

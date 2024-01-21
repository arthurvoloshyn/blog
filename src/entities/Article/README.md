### Article Entity

### This entity is the basis for creating an article.

#### Public api

- Components

`ArticleDetails` - component with information about the article

`ArticleList` - component with the list of articles

- selectors

`getArticleData` - Selector to get information about the currently open article

`getUserIsEditArticle` - Selector for checking whether an article can be edited.

`getArticleError` - Selector to get an error

- slice

`articleReducer` - Reducer for working with an entity

- types

  - `Article` - Type describing an article
  - `SortType` - Type describing what parameters can be sorted by
  - `ArticleType` - Types of articles
  - `ArticleView` - Type describing display options (grid or sheet)
  - `ArticleSchema` - Type describing the schema for the editor.

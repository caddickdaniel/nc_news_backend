exports.endpoints = {
  '/api': {
    'GET /api': {
      description: 'This endpoint lists all available enpoints on the server'
    },
    '/topics': {
      'GET /api/topics': {
        description: 'This endpoint returns all the topics on the server'
      },
      'POST /api/topics': {
        description: 'This enpoint allows the user to add a topic to the server'
      }
    },
    '/articles': {
      'GET /api/articles': {
        description: 'This enpoint returns all the articles on the server'
      },
      'GET /api/articles/:article_id': {
        description:
          'This enpoint returns article that matches given article ID'
      },
      'GET /api/articles/:article_id/comments': {
        description:
          'This enpoint returns all the comments from a particular article, referencing article_id'
      },
      'POST /api/articles/:article_id': {
        description:
          'This endpoint allows the user to add an article to the server, referencing article ID'
      },
      'POST /api/articles/:article_id/comments': {
        description:
          'This endpoint allows the user to add a comment to an article, referencing article ID'
      },
      'PATCH /api/articles/:article_id': {
        description:
          'This endpoint allows the user to update the content of an article, referencing article ID'
      },
      'DELETE /api/articles/:article_id': {
        description:
          'This endpoint allows the user to delete an article, referencing article ID'
      }
    },
    '/comments': {
      'PATCH /api/comments/:comment_id': {
        description:
          'This endpoint allows the user to update the content of a comment, referencing comment_id'
      },
      'DELETE /api/comments/:comment_id': {
        description:
          'This endpoint allows the user to delete a comment, referencing comment_id'
      }
    },
    '/users': {
      'GET /api/users': {
        description: 'This endpoint returns all the users on the server'
      },
      'POST /api/users': {
        description:
          'This endpoint allows the user to add a new user to the server'
      },
      'GET /api/users/:username': {
        description: 'This endpoint returns a single user, referencing username'
      }
    }
  }
};

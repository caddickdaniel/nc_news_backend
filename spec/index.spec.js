process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const app = require('../app');
const request = require('supertest')(app);
const connection = require('../db/connection');

describe('/api', () => {
  beforeEach(() => connection.migrate
    .rollback()
    .then(() => connection.migrate.latest())
    .then(() => connection.seed.run()));
  after(() => connection.destroy());

  describe('/topics', () => {
    it('GET/ status 200/ responds with an array of topic objects', () => request
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).to.be.an('array');
        expect(body.topics[0]).to.contain.keys('slug', 'description');
      }));
    it('GET/ status 200/ responds with an array of topic objects limited to 2 (DEFAULT_CASE)', () => request
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).to.be.an('array');
        expect(body.topics).to.have.length(2);
      }));
    it('GET/ status 200/ responds with an array of topic objects limited to 1, (QUERY)', () => request
      .get('/api/topics?limit=1')
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).to.be.an('array');
        expect(body.topics).to.have.length(1);
        expect(body.topics[0].slug).to.equal('mitch');
      }));
    it('GET/ status 200/ responds with an array of topics sorted by slug (DEFAULT_CASE)', () => request
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        expect(body.topics[0].slug).to.equal('mitch');
      }));
    it('GET/ status 200/ responds with an array of topics sorted by description (QUERY)', () => request
      .get('/api/topics?sort_by=description')
      .expect(200)
      .then(({ body }) => {
        expect(body.topics[0].description).to.equal('The man, the Mitch, the legend');
      }));
    it('GET/ status 200/ responds with an array of topics sorted by order (DEFAULT CASE = DESC)', () => request
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        expect(body.topics[0].slug).to.equal('mitch');
      }));
    it('GET/ status 200/ responds with an array of topics sorted by order (QUERY = ASC)', () => request
      .get('/api/topics?order=asc')
      .expect(200)
      .then(({ body }) => {
        expect(body.topics[0].slug).to.equal('cats');
      }));
    describe('topics/:topic/articles', () => {
      it('GET/ status 200/ responds with articles relating to a specific topic', () => request
        .get('/api/topics/mitch/articles')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an('array');
          expect(body.articles[0].topic).to.equal('mitch');
        }));
      it('GET/ status 200/ responds with an array of articles relating to a specific topic limited to 10 (DEFAULT_CASE)', () => request
        .get('/api/topics/mitch/articles')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an('array');
          expect(body.articles).to.have.length(10);
        }));
      it('GET/ status 200/ responds with an array of articles relating to a specific topic limited to 10, (QUERY)', () => request
        .get('/api/topics/mitch/articles?limit=10')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an('array');
          expect(body.articles).to.have.length(10);
        }));
      it('GET/ status 200/ responds with an array of articles relating to a specific topic sorted by title (DEFAULT_CASE)', () => request
        .get('/api/topics/mitch/articles')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0].title).to.equal('Living in the shadow of a great man');
        }));
      it('GET/ status 200/ responds with an array of articles relating to a specific topic sorted by date created(created_at) (QUERY)', () => request
        .get('/api/topics/mitch/articles?sort_by=created_at')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0].created_at).to.equal('2018-11-15T12:21:54.171Z');
          expect(body.articles[0].topic).to.equal('mitch');
        }));
      it('GET/ status 200/ responds with an array of articles relating to a specific topic sorted by order (DEFAULT CASE = DESC)', () => request
        .get('/api/topics/mitch/articles')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0].article_id).to.equal(1);
        }));
      it('GET/ status 200/ responds with an array of articles relating to a specific topic sorted by order (QUERY = ASC)', () => request
        .get('/api/topics/mitch/articles?order=asc')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0].article_id).to.equal(12);
          expect(body.articles[0].title).to.equal('Moustache');
        }));
      it('POST/ status 201/ adds a topic to the topic object', () => {
        const newTopic = {
          description: 'A description of some sort',
          slug: 'Topicness',
        };
        return request
          .post('/api/topics')
          .send(newTopic)
          .expect(201)
          .then(({ body }) => {
            expect(body.topic.slug).to.equal('Topicness');
            expect(body.topic).to.contain.keys('slug', 'description');
            expect(body.topic).to.be.an('object');
          });
      });
    });
  });
  describe('/articles', () => {
    it('GET/ status 200/ responds with an array of article objects', () => request
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.an('array');
        expect(body.articles[0]).to.contain.keys(
          'author',
          'title',
          'article_id',
          'body',
          'votes',
          'comment_count',
          'created_at',
          'topic',
        );
        expect(body.total_count[0].total_count).to.equal('12');
      }));
    it('GET/ status 200/ responds with an array of articles limited to 10 (DEFAULT_CASE)', () => request
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.an('array');
        expect(body.articles).to.have.length(10);
      }));
    it('GET/ status 200/ responds with an array of articles limited to 5, (QUERY)', () => request
      .get('/api/articles?limit=5')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.an('array');
        expect(body.articles).to.have.length(5);
        expect(body.articles[0].topic).to.equal('mitch');
      }));
    it('GET/ status 200/ responds with an array of articles sorted by title (DEFAULT_CASE)', () => request
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].topic).to.equal('mitch');
      }));
    it('GET/ status 200/ responds with an array of articles sorted by date (created_at) (QUERY)', () => request
      .get('/api/articles?sort_by=created_at')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].created_at).to.equal('2018-11-15T12:21:54.171Z');
      }));
    it('GET/ status 200/ responds with an array of articles sorted by order (DEFAULT CASE = DESC)', () => request
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].title).to.equal('Living in the shadow of a great man');
      }));
    it('GET/ status 200/ responds with an array of articles sorted by order (QUERY = ASC)', () => request
      .get('/api/articles?order=asc')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].title).to.equal('Moustache');
      }));
    it('GET/ status 200/ responds with an array of articles by author', () => request
      .get('/api/articles?author=icellusedkars')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.an('array');
        expect(body.articles[0].topic).to.equal('mitch');
      }));
    it('GET/ status 200/ responds with an array of articles by topic', () => request
      .get('/api/articles?topic=cats')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.an('array');
        expect(body.articles[0].author).to.equal('rogersop');
      }));
    it('GET/ status 200/ responds with an array of articles on page 2 (QUERY = 2)', () => request
      .get('/api/articles?p=2')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.an('array');
        expect(body.articles[0].author).to.equal('icellusedkars');
      }));
    it('POST/ status 201/ adds a article to the article object', () => {
      const newArticle = {
        title: 'The life of a Northcoder',
        topic: 'cats',
        author: 'rogersop',
        body: 'some relevant information about stuff',
      };
      return request
        .post('/api/articles')
        .send(newArticle)
        .expect(201)
        .then(({ body }) => {
          expect(body.article.title).to.equal('The life of a Northcoder');
          expect(body.article).to.contain.keys('title', 'topic', 'author', 'body', 'created_at');
          expect(body.article).to.be.an('object');
        });
    });
    describe('/articles/:article_id', () => {
      it('GET/ status 200/ responds with an array of articles by ID', () => request
        .get('/api/articles/2')
        .expect(200)
        .then(({ body }) => {
          expect(body.article).to.be.an('object');
          expect(body.article.topic).to.equal('mitch');
          expect(body.article.author).to.equal('icellusedkars');
        }));
      it('PATCH/ status 200/ responds with the article that has just been patched', () => {
        const incVote = { inc_votes: 10 };
        return request
          .patch('/api/articles/2')
          .send(incVote)
          .expect(200)
          .then(({ body }) => {
            expect(body.article).to.be.an('object');
            expect(body.article.votes).to.equal(10);
          });
      });
      it('DELETE/ status 204/ responds with a 204 and no-content', () => request.delete('/api/articles/2').expect(204));
    });
  });
  describe('/comments/:comment_id', () => {
    it('GET/ status 200/ responds with array of comments for given article_id', () => request
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).to.be.an('array');
        expect(body.comments[0]).to.contain.keys(
          'comment_id',
          'votes',
          'created_at',
          'author',
          'body',
        );
        expect(body.comments[0].comment_id).to.equal(2);
      }));
    it('GET/ status 200/ responds with an array of comments limited to 10 (DEFAULT_CASE)', () => request
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).to.be.an('array');
        expect(body.comments).to.have.length(10);
      }));
    it('GET/ status 200/ responds with an array of comments limited to 5, (QUERY)', () => request
      .get('/api/articles/1/comments?limit=5')
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).to.be.an('array');
        expect(body.comments).to.have.length(5);
        expect(body.comments[1].author).to.equal('icellusedkars');
      }));
    it('GET/ status 200/ responds with an array of comments sorted by date(created_at) (DEFAULT_CASE)', () => request
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({ body }) => {
        expect(body.comments[0].author).to.equal('butter_bridge');
      }));
    it('GET/ status 200/ responds with an array of comments sorted by comment_id (QUERY)', () => request
      .get('/api/articles/1/comments?sort_by=comment_id')
      .expect(200)
      .then(({ body }) => {
        expect(body.comments[0].comment_id).to.equal(18);
        expect(body.comments[0].author).to.equal('butter_bridge');
      }));
    it('GET/ status 200/ responds with an array of comments sorted by order (DEFAULT CASE = DESC)', () => request
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({ body }) => {
        expect(body.comments[0].author).to.equal('butter_bridge');
        expect(body.comments[0].comment_id).to.equal(2);
      }));
    it('GET/ status 200/ responds with an array of comments sorted by order (QUERY = ASC)', () => request
      .get('/api/articles/1/comments?order=asc')
      .expect(200)
      .then(({ body }) => {
        expect(body.comments[0].author).to.equal('butter_bridge');
        expect(body.comments[0].comment_id).to.equal(18);
      }));
    it('POST/ status 201/ responds with the posted comment', () => {
      const newComment = {
        author: 'butter_bridge',
        body: 'This is a very interesting comment',
      };
      return request
        .post('/api/articles/3/comments')
        .send(newComment)
        .expect(201)
        .then(({ body }) => {
          expect(body.comment.author).to.equal(newComment.author);
          expect(body.comment.body).to.equal(newComment.body);
        });
    });
    it('PATCH/ status 200/ responds with the comment thats just been updated', () => {
      const inc_votes = { inc_votes: 10 };
      return request
        .patch('/api/comments/10')
        .send(inc_votes)
        .expect(200)
        .then(({ body }) => {
          expect(body.comment.author).to.equal('icellusedkars');
          expect(body.comment.votes).to.equal(10);
        });
    });
    it('DELETE/ status 204/ responds with a 204 and no-content', () => request.delete('/api/comments/2').expect(204));
  });
  describe('/users', () => {
    it('GET/ status 200/ responds with an array of user objects', () => request
      .get('/api/users')
      .expect(200)
      .then(({ body }) => {
        expect(body.users).to.be.an('array');
        expect(body.users[0]).to.contain.keys('username', 'avatar_url', 'name');
      }));
    it('POST/ status 201/ responds with the posted user', () => {
      const userObj = {
        username: 'dantheman',
        avatar_url: 'www.google.com',
        name: 'Daniel Shmaddick',
      };
      return request
        .post('/api/users')
        .send(userObj)
        .expect(201)
        .then(({ body }) => {
          expect(body.user).to.be.an('object');
          expect(body.user.username).to.equal('dantheman');
        });
    });
    it('GET/ status 200/ responds with a user object by username', () => request
      .get('/api/users/butter_bridge')
      .expect(200)
      .then(({ body }) => {
        expect(body.user).to.be.an('object');
        expect(body.user.username).to.equal('butter_bridge');
        expect(body.user).to.contain.keys('username', 'avatar_url', 'name');
      }));
  });
  describe('/api', () => {
    it('GET/ status 200/ responds with a JSON describing all available endpoints on the API', () => request
      .get('/api')
      .expect(200)
      .then(({ body }) => {
        expect(body).to.be.an('object');
      }));
  });
  describe('/errors', () => {
    it('GET ERROR/ status 404/ responds with an error msg stating they have entered an incorrect endpoint', () => request
      .get('/api/top')
      .expect(404)
      .then(({ body }) => {
        expect(body.message).to.equal(
          'Sorry, this page was not found! Go to /api to see a list of endpoints',
        );
      }));
    it('POST ERROR/ status 400/ responds with an error msg stating they have entered an incorrect syntax', () => {
      const newTopic = {
        description: 'A description of some sort',
        slug: 'hitch',
        username: 'pauline',
      };
      return request
        .post('/api/topics/')
        .send(newTopic)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal(
            'Sorry, an incorrect format has been detected. Ensure you have typed in the correct format and try again',
          );
        });
    });
    it('POST ERROR/ status 422/ responds with an error msg stating they have entered a key that already exists', () => {
      const newTopic = {
        description: 'A description of some sort',
        slug: 'mitch',
      };
      return request
        .post('/api/topics/')
        .send(newTopic)
        .expect(422)
        .then(({ body }) => {
          expect(body.message).to.equal('Sorry, but the key you entered already exists');
        });
    });
    it('DELETE ERROR/ status 405/ responds with an error msg stating they have chose a non-existent method on topics endpoint', () => request
      .delete('/api/topics')
      .expect(405)
      .then(({ body }) => {
        expect(body.message).to.equal('Method Not Allowed');
      }));
    it('DELETE ERROR/ status 405/ responds with an error msg stating they have chose a non-existent method on articles endpoint', () => request
      .delete('/api/articles')
      .expect(405)
      .then(({ body }) => {
        expect(body.message).to.equal('Method Not Allowed');
      }));
    it('DELETE ERROR/ status 405/ responds with an error msg stating they have chose a non-existent method on articles/:comment_id/comments endpoint', () => request
      .delete('/api/articles/5/comments')
      .expect(405)
      .then(({ body }) => {
        expect(body.message).to.equal('Method Not Allowed');
      }));
    it('GET ERROR/ status 404/ responds with an error msg stating they have entered a non-existent article_id', () => request
      .get('/api/articles/5000')
      .expect(404)
      .then(({ body }) => {
        expect(body.message).to.equal('Article ID doesnt exist');
      }));
    it('DELETE ERROR/ status 404/ responds with an error msg stating they have entered a non-existent comment_id', () => request
      .delete('/api/comments/5000')
      .expect(404)
      .then(({ body }) => {
        expect(body.message).to.equal('Comment ID doesnt exist');
      }));
    it('PATCH ERROR/ status 400/ responds a message informing user vote value needs to be a number', () => {
      const incVote = { inc_votes: '10' };
      return request
        .patch('/api/articles/2')
        .send(incVote)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal('Malformed syntax, check you have entered a Number');
        });
    });
    it('POST ERROR/ status 405/ responds with a message stating the method isnt available', () => {
      const comment = { comment: 'Something within a comment' };
      return request
        .post('/api/comments/2')
        .send(comment)
        .expect(405)
        .then(({ body }) => {
          expect(body.message).to.equal('Method Not Allowed');
        });
    });
    it('POST ERROR/ status 405/ responds with a message stating the method isnt available', () => {
      const user = { comment: 'Something within a user obj' };
      return request
        .post('/api/users/mitch')
        .send(user)
        .expect(405)
        .then(({ body }) => {
          expect(body.message).to.equal('Method Not Allowed');
        });
    });
  });
});

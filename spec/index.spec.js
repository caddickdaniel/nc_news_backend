process.env.NODE_ENV = 'test';
const app = require('../app');
const { expect } = require('chai');
const request = require('supertest')(app);
const connection = require('../db/connection');

describe('/api', () => {
  beforeEach(() => {
    return connection.migrate
      .rollback()
      .then(() => connection.migrate.latest())
      .then(() => connection.seed.run());
  });
  after(() => connection.destroy());

  describe('/topics', () => {
    it('GET/ status 200/ responds with an array of topic objects', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          //   console.log(body);
          expect(body.topics).to.be.an('array');
          expect(body.topics[0]).to.contain.keys('slug', 'description');
        });
    });
    it('GET/ status 200/ responds with an array of topic objects limited to 2 (DEFAULT_CASE)', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          //   console.log(body.topics);
          expect(body.topics).to.be.an('array');
          expect(body.topics).to.have.length(2);
        });
    });
    it('GET/ status 200/ responds with an array of topic objects limited to 1, (QUERY)', () => {
      return request
        .get('/api/topics?limit=1')
        .expect(200)
        .then(({ body }) => {
          //   console.log(body.topics);
          expect(body.topics).to.be.an('array');
          expect(body.topics).to.have.length(1);
          expect(body.topics[0].slug).to.equal('mitch');
        });
    });
    it('GET/ status 200/ responds with an array of topics sorted by slug (DEFAULT_CASE)', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          //   console.log(body.topics);
          expect(body.topics[0].slug).to.equal('mitch');
        });
    });
    it('GET/ status 200/ responds with an array of topics sorted by description (QUERY)', () => {
      return request
        .get('/api/topics?sort_by=description')
        .expect(200)
        .then(({ body }) => {
          //   console.log(body);
          expect(body.topics[0].description).to.equal(
            'The man, the Mitch, the legend'
          );
        });
    });
    it('GET/ status 200/ responds with an array of topics sorted by order (DEFAULT CASE = DESC)', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          //   console.log(body);
          expect(body.topics[0].slug).to.equal('mitch');
        });
    });
    it('GET/ status 200/ responds with an array of topics sorted by order (QUERY = ASC)', () => {
      return request
        .get('/api/topics?order=asc')
        .expect(200)
        .then(({ body }) => {
          //   console.log(body);
          expect(body.topics[0].slug).to.equal('cats');
        });
    });
    it('GET/ status 200/ responds with articles relating to a specific topic', () => {
      return request
        .get('/api/topics/mitch/articles')
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
          expect(body.articles).to.be.an('array');
          expect(body.articles[0].topic).to.equal('mitch');
        });
    });
    it('GET/ status 200/ responds with an array of articles relating to a specific topic limited to 10 (DEFAULT_CASE)', () => {
      return request
        .get('/api/topics/mitch/articles')
        .expect(200)
        .then(({ body }) => {
          //   console.log(body.topics);
          expect(body.articles).to.be.an('array');
          expect(body.articles).to.have.length(10);
        });
    });
    it('GET/ status 200/ responds with an array of articles relating to a specific topic limited to 5, (QUERY)', () => {
      return request
        .get('/api/topics/mitch/articles?limit=5')
        .expect(200)
        .then(({ body }) => {
          //   console.log(body.topics);
          expect(body.articles).to.be.an('array');
          expect(body.articles).to.have.length(5);
        });
    });
    it('GET/ status 200/ responds with an array of articles relating to a specific topic sorted by title (DEFAULT_CASE)', () => {
      return request
        .get('/api/topics/mitch/articles')
        .expect(200)
        .then(({ body }) => {
          // console.log(body.artilcles);
          expect(body.articles[0].title).to.equal(
            'Living in the shadow of a great man'
          );
        });
    });
    it('GET/ status 200/ responds with an array of articles relating to a specific topic sorted by date created(created_at) (QUERY)', () => {
      return request
        .get('/api/topics/mitch/articles?sort_by=created_at')
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
          expect(body.articles[0].created_at).to.equal(
            '2018-11-15T12:21:54.171Z'
          );
          expect(body.articles[0].topic).to.equal('mitch');
        });
    });
    it('GET/ status 200/ responds with an array of articles relating to a specific topic sorted by order (DEFAULT CASE = DESC)', () => {
      return request
        .get('/api/topics/mitch/articles')
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
          expect(body.articles[0].article_id).to.equal(1);
        });
    });
    it('GET/ status 200/ responds with an array of articles relating to a specific topic sorted by order (QUERY = ASC)', () => {
      return request
        .get('/api/topics/mitch/articles?order=asc')
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
          expect(body.articles[0].article_id).to.equal(12);
          expect(body.articles[0].title).to.equal('Moustache');
        });
    });
    it('POST/ status 201/ adds a topic to the topic object', () => {
      const newTopic = {
        description: 'A description of some sort',
        slug: 'Topicness'
      };
      return request
        .post('/api/topics')
        .send(newTopic)
        .expect(201)
        .then(({ body }) => {
          //   console.log(body);
          expect(body.topic.slug).to.equal('Topicness');
          expect(body.topic).to.contain.keys('slug', 'description');
          expect(body.topic).to.be.an('object');
        });
    });
  });
  describe('/articles', () => {
    it('GET/ status 200/ responds with an array of article objects', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
          expect(body.articles).to.be.an('array');
          expect(body.articles[0]).to.contain.keys(
            'author',
            'title',
            'article_id',
            'body',
            'votes',
            'comment_count',
            'created_at',
            'topic'
          );
        });
    });
    it('GET/ status 200/ responds with an array of articles limited to 10 (DEFAULT_CASE)', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(({ body }) => {
          //   console.log(body.articles);
          expect(body.articles).to.be.an('array');
          expect(body.articles).to.have.length(10);
        });
    });
    it('GET/ status 200/ responds with an array of articles limited to 5, (QUERY)', () => {
      return request
        .get('/api/articles?limit=5')
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
          expect(body.articles).to.be.an('array');
          expect(body.articles).to.have.length(5);
          expect(body.articles[0].topic).to.equal('mitch');
        });
    });
    it('GET/ status 200/ responds with an array of articles sorted by title (DEFAULT_CASE)', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
          expect(body.articles[0].topic).to.equal('mitch');
        });
    });
    it('GET/ status 200/ responds with an array of articles sorted by date (created_at) (QUERY)', () => {
      return request
        .get('/api/articles?sort_by=created_at')
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
          expect(body.articles[0].created_at).to.equal(
            '2018-11-15T12:21:54.171Z'
          );
        });
    });
    it('GET/ status 200/ responds with an array of articles sorted by order (DEFAULT CASE = DESC)', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
          expect(body.articles[0].title).to.equal(
            'Living in the shadow of a great man'
          );
        });
    });
    it('GET/ status 200/ responds with an array of articles sorted by order (QUERY = ASC)', () => {
      return request
        .get('/api/articles?order=asc')
        .expect(200)
        .then(({ body }) => {
          // console.log(body.articles);
          expect(body.articles[0].title).to.equal('Moustache');
        });
    });
    it('GET/ status 200/ responds with an array of articles by ID', () => {
      return request
        .get('/api/articles/1')
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
          expect(body.articles).to.be.an('object');
          expect(body.articles.topic).to.equal('mitch');
        });
    });
    it('GET/ status 200/ responds with an array of articles by author', () => {
      return request
        .get('/api/articles?author=icellusedkars')
        .expect(200)
        .then(({ body }) => {
          // console.log(body.articles);
          expect(body.articles).to.be.an('array');
          expect(body.articles[0].topic).to.equal('mitch');
        });
    });
    it('POST/ status 201/ adds a article to the article object', () => {
      const newArticle = {
        title: 'The life of a Northcoder',
        topic: 'cats',
        author: 'rogersop',
        body: 'some relevant information about stuff'
      };
      return request
        .post('/api/articles')
        .send(newArticle)
        .expect(201)
        .then(({ body }) => {
          expect(body.article.title).to.equal('The life of a Northcoder');
          expect(body.article).to.contain.keys(
            'title',
            'topic',
            'author',
            'body',
            'created_at'
          );
          expect(body.article).to.be.an('object');
        });
    });

    //     it('PATCH/ status 204/ responds with the article that has just been patched', () => {
    //       return request
    //         .get('/api/articles/:article_id')
    //         .expect(204)
    //         .then(({ body }) => {
    //           //   console.log(body);
    //           expect(body.articles).to.be.an('array');
    //           //need another expect
    //         });
    //     });
    //     it('DELETE/ status 204/ responds with a 204 and no-content', () => {
    //       return request
    //         .get('/api/articles/:article_id')
    //         .expect(204)
    //         .then(({ body }) => {
    //           //   console.log(body);
    //           expect(body.articles).to.be.an('array');
    //           //need another expect
    //         });
    //     });
    //     it('GET/ status 200/ responds with array of comments for given article_id', () => {
    //       return request
    //         .get('/api/articles/:article_id/comments')
    //         .expect(200)
    //         .then(({ body }) => {
    //           //   console.log(body);
    //           expect(body.articles).to.be.an('array');
    //           expect(body.articles).to.contain.keys(
    //             'comment_id',
    //             'votes',
    //             'created_at',
    //             'author',
    //             'body'
    //           );
    //         });
    //     });
    //     it('GET/ status 200/ responds with an array of comments limited to 10 (DEFAULT_CASE)', () => {
    //       return request
    //         .get('/api/articles/:article_id/comments')
    //         .expect(200)
    //         .then(({ body }) => {
    //           //   console.log(body.articles);
    //           expect(body.articles).to.be.an('array');
    //           expect(body.articles).to.have.length(10);
    //         });
    //     });
    //     it('GET/ status 200/ responds with an array of comments limited to 5, (QUERY)', () => {
    //       return request
    //         .get('/api/articles/:article_id/comments?limit=5')
    //         .expect(200)
    //         .then(({ body }) => {
    //           //   console.log(body.articles);
    //           expect(body.articles).to.be.an('array');
    //           expect(body.articles).to.have.length(5);
    //           expect(body.articles[0].author).to.equal('');
    //         });
    //     });
    //     it('GET/ status 200/ responds with an array of comments sorted by date(created_at) (DEFAULT_CASE)', () => {
    //       return request
    //         .get('/api/articles/:article_id/comments')
    //         .expect(200)
    //         .then(({ body }) => {
    //           //   console.log(body.articles);
    //           expect(body.articles[0].author).to.equal('');
    //         });
    //     });
    //     it('GET/ status 200/ responds with an array of comments sorted by author (QUERY)', () => {
    //       return request
    //         .get('/api/articles/:article_id/comments?sort_by=author')
    //         .expect(200)
    //         .then(({ body }) => {
    //           //   console.log(body);
    //           expect(body.articles[0].author).to.equal('');
    //         });
    //     });
    //     it('GET/ status 200/ responds with an array of comments sorted by order (DEFAULT CASE = DESC)', () => {
    //       return request
    //         .get('/api/articles/:article_id/comments')
    //         .expect(200)
    //         .then(({ body }) => {
    //           //   console.log(body);
    //           expect(body.articles[0].author).to.equal('');
    //         });
    //     });
    //     it('GET/ status 200/ responds with an array of comments sorted by order (QUERY = ASC)', () => {
    //       return request
    //         .get('/api/articles/:article_id/comments?order=asc')
    //         .expect(200)
    //         .then(({ body }) => {
    //           //   console.log(body);
    //           expect(body.articles[0].author).to.equal('');
    //         });
    //     });
    //     it('POST/ status 201/ responds with the posted comment', () => {
    //       return request
    //         .get('/api/articles/:article_id/comments')
    //         .expect(201)
    //         .then(({ body }) => {
    //           //   console.log(body);
    //           expect(body.articles[0].username).to.equal('');
    //           expect(body.articles[0].body).to.equal('');
    //         });
    //     });
    //     it('PATCH/ status 204/ responds with the comment thats just been updated', () => {
    //       return request
    //         .get('/api/articles/:article_id/comments/:comment_id')
    //         .expect(204)
    //         .then(({ body }) => {
    //           //   console.log(body);
    //           expect(body).to.equal('');
    //           expect(body).to.equal('');
    //         });
    //     });
    //     it('DELETE/ status 204/ deletes comment by id and responds with 204 and no-content', () => {
    //       return request
    //         .get('/api/articles/:article_id/comments/:comment_id')
    //         .expect(204)
    //         .then(({ body }) => {
    //           //   console.log(body);
    //           expect(body).to.equal('');
    //           expect(body).to.equal('');
    //         });
    //     });
    //   });
    //   describe('/users', () => {
    //     it('GET/ status 200/ responds with an array of user objects', () => {
    //       return request
    //         .get('/api/users')
    //         .expect(200)
    //         .then(({ body }) => {
    //           //   console.log(body);
    //           expect(body.users).to.be.an('array');
    //           expect(body.users[0]).to.contain.keys(
    //             'username',
    //             'avatar_url',
    //             'name'
    //           );
    //         });
    //     });
    //     it('POST/ status 201/ responds with the posted user', () => {
    //       return request
    //         .get('/api/users')
    //         .expect(201)
    //         .then(({ body }) => {
    //           //   console.log(body);
    //           expect(body.users).to.be.an('array');
    //           expect(body.users[0].username).to.equal('');
    //         });
    //     });
    //     it('GET/ status 200/ responds with a user object by username', () => {
    //       return request
    //         .get('/api/users/:username')
    //         .expect(200)
    //         .then(({ body }) => {
    //           //   console.log(body);
    //           expect(body.users).to.be.an('array');
    //           expect(body.users[0].username).to.equal('');
    //           expect(body.users[0]).to.contain.keys(
    //             'username',
    //             'avatar_url',
    //             'name'
    //           );
    //         });
    //     });
    //     it('GET/ status 200/ responds with articles from a given username', () => {
    //       return request
    //         .get('/api/users/:username/articles')
    //         .expect(200)
    //         .then(({ body }) => {
    //           //   console.log(body);
    //           expect(body.users).to.be.an('array');
    //           expect(body.users[0]).to.contain.keys(
    //             'total_count',
    //             'articles',
    //             'author',
    //             'title',
    //             'article_id',
    //             'votes',
    //             'comment_count',
    //             'created_at',
    //             'topic'
    //           );
    //         });
    //     });
    //     it('GET/ status 200/ responds with an array of users articles limited to 10 (DEFAULT_CASE)', () => {
    //       return request
    //         .get('/api/users/:username/articles')
    //         .expect(200)
    //         .then(({ body }) => {
    //           //   console.log(body.users);
    //           expect(body.users).to.be.an('array');
    //           expect(body.users).to.have.length(10);
    //         });
    //     });
    //     it('GET/ status 200/ responds with an array of comments limited to 5, (QUERY)', () => {
    //       return request
    //         .get('/api/users/:username/articles?limit=5')
    //         .expect(200)
    //         .then(({ body }) => {
    //           //   console.log(body.users);
    //           expect(body.users).to.be.an('array');
    //           expect(body.users).to.have.length(5);
    //           expect(body.users[0].author).to.equal('');
    //         });
    //     });
    //     it('GET/ status 200/ responds with an array of users articles sorted by date(created_at) (DEFAULT_CASE)', () => {
    //       return request
    //         .get('/api/users/:username/articles')
    //         .expect(200)
    //         .then(({ body }) => {
    //           //   console.log(body.users);
    //           expect(body.users[0].author).to.equal('');
    //         });
    //     });
    //     it('GET/ status 200/ responds with an array of user articles sorted by author (QUERY)', () => {
    //       return request
    //         .get('/api/users/:username/articles?sort_by=author')
    //         .expect(200)
    //         .then(({ body }) => {
    //           //   console.log(body);
    //           expect(body.users[0].author).to.equal('');
    //         });
    //     });
    //     it('GET/ status 200/ responds with an array of user articles sorted by order (DEFAULT CASE = DESC)', () => {
    //       return request
    //         .get('/api/users/:username/articles')
    //         .expect(200)
    //         .then(({ body }) => {
    //           //   console.log(body);
    //           expect(body.users[0].author).to.equal('');
    //         });
    //     });
    //     it('GET/ status 200/ responds with an array of comments sorted by order (QUERY = ASC)', () => {
    //       return request
    //         .get('/api/users/:username/articles?order=asc')
    //         .expect(200)
    //         .then(({ body }) => {
    //           //   console.log(body);
    //           expect(body.users[0].author).to.equal('');
    //         });
    //     });
    //     it('GET/ status 200/ responds with a JSON describing all available endpoints on the API', () => {
    //       return request
    //         .get('/api')
    //         .expect(200)
    //         .then(({ body }) => {
    //           //   console.log(body);
    //         });
    //     });
    // });
    // describe('/errors', () => {
    //     it('ERROR/ status 422/ responds with an error msg stating they have entered an already existing key', () => {
    //       return request
    //         .get('/api/users')
    //         .expect(200)
    //         .then(({ body }) => {
    //           //   console.log(body);
    //           expect(body.users).to.be.an('array');
    //           expect(body.users[0]).to.contain.keys(
    //             'username',
    //             'avatar_url',
    //             'name'
    //           );
    //         });
    //     });

    //IN CONTROLLER WHEN 404 COMES BACK AS 200
    // if() return Promise.reject({status: 404, message: 'mp not found'}) <-- before res.status
    //then in app you need to create next middleware function with personalised error messages for various codes

    //it get status 200 each party has mp count property
    //return request
    //.get /api/parties
    //expect 200
    //then body
    //expect body parties [0] mpcount to equal ()

    // SELECT parties.party, parties.founded
    // COUNT (mps.mp_id) AS mp_count
    // FROM parties JOIN mps ON parties.party = mps.party
    // GROUP BY parties.party;
    // ORDER BY parties.party DESC
    // LIMIT 10;
  });
});

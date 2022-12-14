let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

describe('Login and Check Token', () => {
   const obj = {
      email: 'aman@gmail.com',
      password: 'aman123'
   }
   it('It should login, and return token', (done) => {
      chai.request(server)
        .post('/api/authenticate')
        .send(obj)
        .end( (err, res) =>  {
         console.log('this was the login part');
         res.should.have.status(200);
         res.body.should.have.property('token');
         token = res.body.token;

         done();
      })
   })
});

describe('Login and check token', () => {
   const obj = {
      email: 'aman12@gmail.com',
      password: 'aman123'
   }
   it('invalid user', (done) => {
      chai.request(server)
        .post('/api/authenticate')
        .send(obj)
        .end( (err, res) =>  {
         res.should.have.status(400);
         done();
      })
   })
});

describe('Authenticated the request and return the respective user profile',  () => {
   it("return username, numbers of followers &followings", (done) =>  {
       chai.request(server)
         .get('/api/user')
         .set('Cookie', `jwt=${token}`)
         .then((res) => {
            expect(res).to.have.status(200)
          // console.log(token);
           // const body = res.body
           //  console.log(body) not really needed, but I include them as a comment
           done();
         }).catch((err) => done(err))
      })
})

describe('Add a new Post created by the authenticared user', () =>{
   const object = {
      Title:"Hello",
      Description:'my first post'
   }
   it('Post added', (done) => {
      chai.request(server)
         .post('/api/posts')
         .send(object)
         .set('Cookie', `jwt=${token}`)
         .end((err,res) => {
            res.should.have.status(200);
            done();
         })
   })
})

describe('Add a new Post created by the authenticared user', () =>{
   const object = {
      Title:"",
      Description:'my first post'
   }
   it('title is missing', (done) => {
      chai.request(server)
         .post('/api/posts')
         .send(object)
         .set('Cookie', `jwt=${token}`)
         .end((err,res) => {
            res.should.have.status(400);
            done();
         })
   })
})

describe('Return all posts created by authenticated User', () => {
   it('It return id,title,desc,created_at,comment ans likes', (done) => {
      chai.request(server)
        .get('/api/all_posts')
        .set('Cookie', `jwt=${token}`)
        .end( (err, res) =>  {
         res.should.have.status(200);
         done();
      })
   })
});


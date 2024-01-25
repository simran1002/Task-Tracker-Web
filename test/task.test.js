require("dotenv").config();
require('@babel/register');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

const { expect } = chai;

chai.use(chaiHttp);

describe('Tasks API', () => {

  let authToken = process.env.TOKEN;

  // Test the POST /tasks endpoint
  describe('POST /tasks', () => {
    it('should create a new task', (done) => {
      const newTask = {
        taskId: 'unique-task-id',
        title: 'Test Task',
        description: 'This is a test task',
        assigned_user: 'user123',
        due_date: '2022-12-31',
        status: 'pending',
        category: 'TestCategory',
      };

      chai
        .request(server)
        .post('/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newTask)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal(true);
          done();
        });
    });
  });

  // Test the GET /tasks endpoint
  describe('GET /tasks', () => {
    it('should get all tasks', (done) => {
      chai
        .request(server)
        .get('/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal(true);
          done();
        });
    });
  });

  // Test the GET /tasks/:id endpoint
  describe('GET /tasks/:id', () => {
    it('should get a specific task by ID', (done) => {
      const taskId = 'unique-task-id';

      chai
        .request(server)
        .get(`/tasks/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal(true);
          done();
        });
    });
  });

  // Test the PUT /task-done/:taskId endpoint
  describe('PUT /task-done/:taskId', () => {
    it('should mark a task as completed', (done) => {
      const taskId = 'unique-task-id'; // Replace with an actual task ID

      chai
        .request(server)
        .put(`/task-done/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal(true);
          done();
        });
    });
  });

  // Test the PUT /tasks/:id endpoint
  describe('PUT /tasks/:id', () => {
    it('should update a task by ID', (done) => {
      const taskId = 'unique-task-id';
      const updatedTask = {
        title: 'Updated Task',
        description: 'This task has been updated',
        status: 'in-progress',
      };

      chai
        .request(server)
        .put(`/tasks/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updatedTask)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal(true);
          done();
        });
    });
  });

  // Test the DELETE /tasks/:id endpoint
  describe('DELETE /tasks/:id', () => {
    it('should delete a task by ID', (done) => {
      const taskId = 'unique-task-id';

      chai
        .request(server)
        .delete(`/tasks/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal(true);
          done();
        });
    });
  });

  // Close the server after all tests
  after(() => {
    server.close();
  });
});

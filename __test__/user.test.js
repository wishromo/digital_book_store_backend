import { connect, close, clear } from './setup.js';
import User from '../model/User.js'; // Adjust the path to your User model

describe('User Model', () => {
  // Connect to the in-memory database before all tests
  beforeAll(async () => {
    await connect();
  }, 30000); // Increased timeout for database connection

  // Clear all data after each test to ensure isolation
  afterEach(async () => {
    await clear();
  });

  // Disconnect and stop the in-memory database after all tests
  afterAll(async () => {
    await close();
  });

  it('should create and save a new user successfully', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };
    const user = new User(userData);
    await user.save();

    // Verify the user was saved and has a unique ID
    expect(user._id).toBeDefined();
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
  });

  it('should fail to create a user without a required name field', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
    };
    const user = new User(userData);
    
    let err;
    try {
      await user.save();
    } catch (error) {
      err = error;
    }

    // Expect a validation error because the name is missing
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe('ValidationError');
    expect(err.errors.name).toBeDefined();
  });

  it('should fail to create a user with a duplicate email', async () => {
    // First, save a user
    const firstUser = new User({
      name: 'First User',
      email: 'duplicate@example.com',
      password: 'password123',
    });
    await firstUser.save();

    // Now, try to save another user with the same email
    const secondUser = new User({
      name: 'Second User',
      email: 'duplicate@example.com',
      password: 'password123',
    });

    let err;
    try {
      await secondUser.save();
    } catch (error) {
      err = error;
    }

    // Expect a Mongoose duplicate key error
    expect(err).toBeInstanceOf(Error);
    expect(err.code).toBe(11000); 
  });
});
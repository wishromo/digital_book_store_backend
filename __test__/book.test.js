import mongoose from 'mongoose';
import Book from '../model/Books.js'; // Adjust path if needed
import { connect, clear, close } from '../__test__/setup.js'; // This is your setup file

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clear();
});

afterAll(async () => {
  await close();
});

describe('Book Model Test (In-Memory DB)', () => {
  it('should create & save a book successfully', async () => {
    const validBook = new Book({
      title: 'In-Memory Test Book',
      author: 'Alice Smith',
      description: 'Test description',
      genre: 'Sci-Fi',
      price: 10.99,
      coverImage: 'cover.jpg',
      bookpdf: 'book.pdf',
    });

    const savedBook = await validBook.save();

    expect(savedBook._id).toBeDefined();
    expect(savedBook.title).toBe('In-Memory Test Book');
    expect(savedBook.bookpdf).toBe('book.pdf');
  });

  it('should fail when required field is missing', async () => {
    const invalidBook = new Book({
      author: 'No Title',
    });

    let err;
    try {
      await invalidBook.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.title).toBeDefined();
  });
});

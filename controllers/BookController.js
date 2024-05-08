import Book from '../models/BookModel.js';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs/promises';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const uploadDirectory = path.join(__dirname, '../public/uploads');

const ensureUploadDirectoryExists = async () => {
  try {
    await fs.access(uploadDirectory);
  } catch (error) {
    await fs.mkdir(uploadDirectory, { recursive: true });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      res.status(404).json({ message: 'Buku tidak ditemukan' });
      return;
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBook = async (req, res) => {
  const { name, author, price } = req.body;
  try {
    const newBook = await Book.create({ name, author, price });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { name, author, price } = req.body;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      res.status(404).json({ message: 'Buku tidak ditemukan' });
      return;
    }
    await book.update({ name, author, price });
    res.json({ message: 'Buku berhasil diupdate' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      res.status(404).json({ message: 'Buku tidak ditemukan' });
      return;
    }
    await book.destroy();
    res.json({ message: 'Buku berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

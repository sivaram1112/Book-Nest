import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Book from './models/Book.js';
import Author from './models/Author.js';
import Genre from './models/Genre.js';
import Inventory from './models/Inventory.js';
import Order from './models/Order.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // Clear existing data
        await Order.deleteMany();
        await Inventory.deleteMany();
        await Book.deleteMany();
        await Author.deleteMany();
        await Genre.deleteMany();
        // await User.deleteMany(); // Keep users for now to avoid deleting the admin

        console.log('Data Cleared!');

        // Create Authors
        const authorData = [
            { name: 'J.K. Rowling', bio: 'British author, best known for the Harry Potter series.' },
            { name: 'George R.R. Martin', bio: 'American novelist and short story writer, screenwriter, and television producer.' },
            { name: 'J.R.R. Tolkien', bio: 'English writer, poet, philologist, and academic.' },
            { name: 'Agatha Christie', bio: 'English writer known for her sixty-six detective novels and fourteen short story collections.' },
            { name: 'Stephen King', bio: 'American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels.' },
        ];

        const createdAuthors = await Author.insertMany(authorData);

        // Create Genres
        const genreData = [
            { name: 'Fantasy' },
            { name: 'Science Fiction' },
            { name: 'Mystery' },
            { name: 'Horror' },
            { name: 'Thriller' },
            { name: 'Romance' },
        ];

        const createdGenres = await Genre.insertMany(genreData);

        // Helpers to get IDs
        const getAuthor = (name) => createdAuthors.find(a => a.name === name)._id;
        const getGenre = (name) => createdGenres.find(g => g.name === name)._id;

        const bookData = [
            {
                title: 'Harry Potter and the Sorcerer\'s Stone',
                authors: [getAuthor('J.K. Rowling')],
                genres: [getGenre('Fantasy')],
                description: 'A young wizard discovers his magical heritage and attends a school of witchcraft and wizardry.',
                price: 19.99,
                image: '/images/harry-potter.jpg',
                isbn: '9780590353427',
            },
            {
                title: 'A Game of Thrones',
                authors: [getAuthor('George R.R. Martin')],
                genres: [getGenre('Fantasy')],
                description: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
                price: 24.99,
                image: '/images/game-of-thrones.jpg',
                isbn: '9780553103540',
            },
            {
                title: 'The Hobbit',
                authors: [getAuthor('J.R.R. Tolkien')],
                genres: [getGenre('Fantasy')],
                description: 'A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home, and the gold within it from the dragon Smaug.',
                price: 14.99,
                image: 'https://images-na.ssl-images-amazon.com/images/I/91b0C2YNSrL.jpg',
                isbn: '9780547928227',
            },
            {
                title: 'Murder on the Orient Express',
                authors: [getAuthor('Agatha Christie')],
                genres: [getGenre('Mystery')],
                description: 'A lavish trip through Europe quickly unfolds into a race against time to solve a murder aboard a train.',
                price: 12.99,
                image: '/images/murder-on-orient-express.jpg',
                isbn: '9780062693662',
            },
            {
                title: 'It',
                authors: [getAuthor('Stephen King')],
                genres: [getGenre('Horror')],
                description: 'In the summer of 1989, a group of bullied kids band together to destroy a shape-shifting monster, which disguises itself as a clown and preys on the children of Derry, their small Maine town.',
                price: 22.99,
                image: 'https://images-na.ssl-images-amazon.com/images/I/71dBoszwR+L.jpg',
                isbn: '9781501142970',
            }
        ];

        const createdBooks = await Book.insertMany(bookData);

        // Create Inventory
        const inventoryData = createdBooks.map(book => ({
            book: book._id,
            quantity: Math.floor(Math.random() * 50) + 10, // Random stock between 10 and 60
            location: 'Warehouse A'
        }));

        await Inventory.insertMany(inventoryData);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Inventory.deleteMany();
        await Book.deleteMany();
        await Author.deleteMany();
        await Genre.deleteMany();
        // await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}

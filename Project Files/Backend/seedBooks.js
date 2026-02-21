const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book.js');
const Author = require('./models/Author.js');
const Genre = require('./models/Genre.js');
const Inventory = require('./models/Inventory.js');
const connectDB = require('./config/db.js');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

connectDB();

const importData = async () => {
    try {
        console.log('Adding more books...');

        const newAuthorData = [
            { name: 'J.K. Rowling', bio: 'British author, best known for the Harry Potter series.' },
            { name: 'Dan Brown', bio: 'American author best known for his thriller novels.' },
            { name: 'Paulo Coelho', bio: 'Brazilian lyricist and novelist.' },
            { name: 'Yuval Noah Harari', bio: 'Israeli public intellectual, historian and a professor.' },
            { name: 'George Orwell', bio: 'English novelist and essayist, journalist and critic.' },
            { name: 'Harper Lee', bio: 'American novelist best known for her 1960 novel To Kill a Mockingbird.' },
            { name: 'F. Scott Fitzgerald', bio: 'American novelist and short story writer.' },
            { name: 'J.R.R. Tolkien', bio: 'English writer, poet, philologist, and academic.' },
            { name: 'Jane Austen', bio: 'English novelist known primarily for her six major novels.' },
            { name: 'J.D. Salinger', bio: 'American writer best known for his novel The Catcher in the Rye.' },
            { name: 'Frank Herbert', bio: 'American science fiction author best known for the novel Dune.' },
            { name: 'Michelle Obama', bio: 'American attorney and author who served as the First Lady of the United States.' },
            { name: 'Walter Isaacson', bio: 'American author and journalist.' }
        ];

        // Upsert Authors
        const authors = [];
        for (const author of newAuthorData) {
            let existingAuthor = await Author.findOne({ name: author.name });
            if (!existingAuthor) {
                existingAuthor = await Author.create(author);
            }
            authors.push(existingAuthor);
        }

        const newGenreData = [
            { name: 'History' },
            { name: 'Philosophy' },
            { name: 'Dystopian' },
            { name: 'Classic' },
            { name: 'Thriller' },
            { name: 'Fantasy' },
            { name: 'Science Fiction' },
            { name: 'Biography' }
        ];

        // Upsert Genres
        const genres = [];
        for (const genre of newGenreData) {
            let existingGenre = await Genre.findOne({ name: genre.name });
            if (!existingGenre) {
                existingGenre = await Genre.create(genre);
            }
            genres.push(existingGenre);
        }

        // Helpers
        const getAuthor = (name) => authors.find(a => a.name === name)?._id;
        const getGenre = (name) => genres.find(g => g.name === name)?._id;

        // We need to make sure we can find genres that were just created or fetched
        const findGenre = (name) => genres.find(g => g.name === name)?._id;

        const newBooks = [
            {
                title: 'Harry Potter and the Sorcerer\'s Stone',
                authors: [getAuthor('J.K. Rowling')], // Note: J.K. Rowling needs to be in the authors list above or this will fail if not exists.
                genres: [getGenre('Fantasy')],
                description: 'A young wizard discovers his magical heritage and attends a school of witchcraft and wizardry.',
                price: 19.99,
                image: '/images/harry-potter.jpg',
                isbn: '9780590353427',
            },
            {

                title: 'The Da Vinci Code',
                authors: [getAuthor('Dan Brown')],
                genres: [findGenre('Thriller')],
                description: 'A symbolist is tasked with solving a murder in the Louvre, leading to the discovery of a religious mystery protected by a secret society.',
                price: 18.99,
                image: '/images/da-vinci-code.jpg',
                isbn: '9780307474278',
            },
            {
                title: 'The Alchemist',
                authors: [getAuthor('Paulo Coelho')],
                genres: [findGenre('Philosophy'), findGenre('Fantasy')],
                description: 'A young Andalusian shepherd travels to the pyramids of Egypt to find a treasure he has dreamed of.',
                price: 16.99,
                image: '/images/the-alchemist.jpg',
                isbn: '9780062315007',
            },
            {
                title: 'Sapiens: A Brief History of Humankind',
                authors: [getAuthor('Yuval Noah Harari')],
                genres: [getGenre('History')],
                description: 'A brief history of humankind, from the Stone Age to the twenty-first century.',
                price: 22.50,
                image: '/images/sapiens.jpg',
                isbn: '9780062316097',
            },
            {
                title: '1984',
                authors: [getAuthor('George Orwell')],
                genres: [getGenre('Dystopian'), findGenre('Science Fiction')],
                description: 'A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.',
                price: 15.99,
                image: '/images/1984.jpg',
                isbn: '9780451524935',
            },
            {
                title: 'To Kill a Mockingbird',
                authors: [getAuthor('Harper Lee')],
                genres: [getGenre('Classic')],
                description: 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.',
                price: 14.99,
                image: '/images/to-kill-a-mockingbird.jpg',
                isbn: '9780060935467',
            },
            {
                title: 'The Great Gatsby',
                authors: [getAuthor('F. Scott Fitzgerald')],
                genres: [getGenre('Classic')],
                description: 'The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
                price: 13.99,
                image: '/images/the-great-gatsby.jpg',
                isbn: '9780743273565',
            },
            {
                title: 'Angels & Demons',
                authors: [getAuthor('Dan Brown')],
                genres: [findGenre('Thriller')],
                description: 'Robert Langdon is summoned to a Swiss research facility to analyze a mysterious symbol seared into the chest of a murdered physicist.',
                price: 17.99,
                image: '/images/angels-and-demons.jpg',
                isbn: '9780671027360',
            },
            {
                title: 'The Hobbit',
                authors: [getAuthor('J.R.R. Tolkien')],
                genres: [findGenre('Fantasy')],
                description: 'In a hole in the ground there lived a hobbit.',
                price: 14.99,
                image: '/images/the-hobbit.jpg',
                isbn: '9780547928227',
            },
            {
                title: 'Pride and Prejudice',
                authors: [getAuthor('Jane Austen')],
                genres: [findGenre('Classic')],
                description: 'A romantic novel of manners written by Jane Austen.',
                price: 12.99,
                image: '/images/pride-and-prejudice.jpg',
                isbn: '9780141439518',
            },
            {
                title: 'The Catcher in the Rye',
                authors: [getAuthor('J.D. Salinger')],
                genres: [findGenre('Classic')],
                description: 'A story by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951.',
                price: 13.99,
                image: '/images/the-catcher-in-the-rye.jpg',
                isbn: '9780316769488',
            },
            {
                title: 'Dune',
                authors: [getAuthor('Frank Herbert')],
                genres: [findGenre('Science Fiction')],
                description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides.',
                price: 19.99,
                image: '/images/dune.jpg',
                isbn: '9780441172719',
            },
            {
                title: 'Becoming',
                authors: [getAuthor('Michelle Obama')],
                genres: [findGenre('Biography')],
                description: 'A memoir by the former First Lady of the United States, Michelle Obama.',
                price: 24.99,
                image: '/images/becoming.jpg',
                isbn: '9781524763138',
            },
            {
                title: 'Steve Jobs',
                authors: [getAuthor('Walter Isaacson')],
                genres: [findGenre('Biography')],
                description: 'The biography of the co-founder of Apple Inc., Steve Jobs, written by Walter Isaacson.',
                price: 21.99,
                image: '/images/steve-jobs.jpg',
                isbn: '9781451648539',
            }
        ];

        // Check if book exists by ISBN to avoid duplicates
        for (const book of newBooks) {
            // Check if book exists by ISBN
            const existingBook = await Book.findOne({ isbn: book.isbn });
            if (existingBook) {
                // Update the image if it exists
                existingBook.image = book.image;
                await existingBook.save();
                console.log(`Updated image for: ${book.title}`);
            } else {
                const createdBook = await Book.create(book);
                // Create Inventory
                await Inventory.create({
                    book: createdBook._id,
                    quantity: Math.floor(Math.random() * 50) + 10,
                    location: 'Warehouse B'
                });
                console.log(`Added: ${book.title}`);
            }
        }

        console.log('Books Added/Updated Successfully!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();

import fs from 'fs';
import path from 'path';

const books = [
    {
        title: 'The Da Vinci Code',
        author: 'Dan Brown',
        filename: 'da-vinci-code.svg',
        color: '#2c3e50', // Dark Blue
        textColor: '#ecf0f1'
    },
    {
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        filename: 'the-alchemist.svg',
        color: '#f39c12', // Orange
        textColor: '#fff'
    },
    {
        title: 'Sapiens: A Brief History of Humankind',
        author: 'Yuval Noah Harari',
        filename: 'sapiens.svg',
        color: '#27ae60', // Green
        textColor: '#fff'
    },
    {
        title: '1984',
        author: 'George Orwell',
        filename: '1984.svg',
        color: '#c0392b', // Red
        textColor: '#fff'
    },
    {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        filename: 'to-kill-a-mockingbird.svg',
        color: '#8e44ad', // Purple
        textColor: '#fff'
    },
    {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        filename: 'the-great-gatsby.svg',
        color: '#f1c40f', // Yellow
        textColor: '#2c3e50'
    },
    {
        title: 'Angels & Demons',
        author: 'Dan Brown',
        filename: 'angels-and-demons.svg',
        color: '#e74c3c', // Alizarin
        textColor: '#fff'
    },
    {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        filename: 'the-hobbit.svg',
        color: '#2ecc71', // Emerald
        textColor: '#fff'
    },
    {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        filename: 'pride-and-prejudice.svg',
        color: '#9b59b6', // Amethyst
        textColor: '#fff'
    },
    {
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        filename: 'the-catcher-in-the-rye.svg',
        color: '#e67e22', // Carrot
        textColor: '#fff'
    },
    {
        title: 'Dune',
        author: 'Frank Herbert',
        filename: 'dune.svg',
        color: '#f39c12', // Orange for desert
        textColor: '#fff'
    },
    {
        title: 'Becoming',
        author: 'Michelle Obama',
        filename: 'becoming.svg',
        color: '#3498db', // Peter River
        textColor: '#fff'
    },
    {
        title: 'Steve Jobs',
        author: 'Walter Isaacson',
        filename: 'steve-jobs.svg',
        color: '#34495e', // Wet Asphalt
        textColor: '#fff'
    }
];

const outputDir = path.join(process.cwd(), 'frontend', 'public', 'images');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

books.forEach(book => {
    const svgContent = `
<svg width="300" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${book.color}" />
  <text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="${book.textColor}" font-weight="bold">
    ${book.title.split(':').map((line, i) => `<tspan x="50%" dy="${i === 0 ? 0 : '1.2em'}">${line.trim()}</tspan>`).join('')}
  </text>
  <text x="50%" y="80%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="${book.textColor}" style="opacity: 0.8;">
    ${book.author}
  </text>
</svg>
    `.trim();

    fs.writeFileSync(path.join(outputDir, book.filename), svgContent);
    console.log(`Generated ${book.filename}`);
});

console.log('All SVG covers generated successfully.');

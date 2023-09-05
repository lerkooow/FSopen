const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument.');
    process.exit(1);
}

const password = process.argv[2];

const url =
    `mongodb+srv://lerkoooow:${password}@cluster0.zvzp0xg.mongodb.net/mydatabase?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');

        const blogSchema = new mongoose.Schema({
            title: String,
            author: String,
            url: String,
            likes: Number
        });

        const Blog = mongoose.model('Blog', blogSchema);

        Blog.find({})
            .then(result => {
                result.forEach(blog => {
                    console.log(blog);
                });
            })
            .catch(error => {
                console.error('Error querying the database:', error);
            })
            .finally(() => {
                mongoose.connection.close();
            });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });
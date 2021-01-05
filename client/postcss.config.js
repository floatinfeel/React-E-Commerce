const tailwindcss = require('tailwindcss')

module.exports = {
    //add plugin
    plugins: [
        tailwindcss('./tailwind.js'),
        require('autoprefixer')
    ],
}
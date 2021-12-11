module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: { 
                compress: true 
            },
            build: {
                src: 'src/js/TypingTest.js',
                dest: 'dist/js/TypingTest.min.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'dist/css/style.css': 'src/scss/app.scss'
                }
            }
        },
        watch: {
            css: {
              files: ['src/scss/app.scss'],
              tasks: ['sass:dist']
            },
            js: {
              files: ['src/js/**/*.js'],
              tasks: ['uglify']
            }
          }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify', 'sass']);

};
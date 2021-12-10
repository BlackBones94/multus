module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: 'src/js/typingTest.js',
                dest: 'dist/js/typingTest.min.js'
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
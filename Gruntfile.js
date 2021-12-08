module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/js/typeSpeed.js',
                dest: 'dist/js/typeSpeed.min.js'
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
              files: ['src/js/*.js'],
              tasks: ['uglify']
            }
          }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify']);
    grunt.registerTask('default', ['sass']);

};
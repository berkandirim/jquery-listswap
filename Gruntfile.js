module.exports = function(grunt) {
    
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: 'auto'
                },
                files: {
                    'dist/jquery.listswap.css': 'lib/jquery-listswap.scss'
                }
            },
            dev: {
                options: {
                    style: 'compressed',
                    sourcemap: 'auto'
                },
                files: {
                    'dist/jquery.listswap.min.css': 'lib/jquery-listswap.scss'
                }
            }
        },
        watch: {
            css: {
                files: 'lib/*.scss',
                tasks: ['sass']
            },
            js: {
                files: 'lib/*.js',
                tasks: ['uglify', 'copy', 'jshint']
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
        },
        uglify: {
            target: {
                files: {
                    'dist/jquery.listswap.min.js': ['lib/jquery.listswap.js']
                }
            },
            options: {
                sourceMap: true
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'lib', src: ['jquery.listswap.js'], dest: 'dist/'},
                    {expand: true, cwd: 'dist', src: ['jquery.listswap.min.js', 'jquery.listswap.min.css'], dest: 'docs/assets/plugin/'}
                    
                ]
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'dist/*.css',
                        'dist/*.js',
                        'demo/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    notify: false,
                    server: {
                        baseDir: './'
                    },
                    browser: "google chrome"
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt, {pattern: ['grunt-*', '@*/grunt-*']});

    // Default task(s).
    grunt.registerTask('default', ['sass', 'uglify', 'jshint', 'browserSync', 'watch']);
    grunt.registerTask('build', ['sass', 'uglify', 'copy']);
};
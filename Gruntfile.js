module.exports = function(grunt) {
    // Project configuration
    
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'auto'
                },
                files: {
                    'dist/jquery-listswap.css': 'lib/jquery-listswap.scss'
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
                tasks: ['uglify', 'copy']
            }
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
                    {expand: true, cwd: 'lib', src: ['jquery.listswap.js'], dest: 'dist/'}
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
    grunt.registerTask('default', ['sass', 'uglify', 'browserSync', 'watch']);
    grunt.registerTask('build', ['sass', 'uglify', 'copy']);
};
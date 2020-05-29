'use strict';
function gruntFunction(grunt) {
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.initConfig({
        clean: {
            dist: ["dist", ".tmp"]
        },

        browserify: {
            dist: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/*.js'],
                        dest: '.tmp/'
                    }
                ],
                options: {
                    transform: [['babelify', { presets: ["@babel/preset-env"] }]],
                    browserifyOptions: {
                        globals: true
                    }
                }
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['.tmp/*.js'],
                        dest: 'dist/'
                    }
                ]
                // files: {
                //     'dest/output.min.js': ['src/input.js']
                // }
            }
        }
    });

    grunt.registerTask("build", ["clean:dist", "browserify:dist", "uglify:dist"]);
}
module.exports = gruntFunction;

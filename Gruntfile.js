var fs = require('fs');
var path = require('path');
var sweet = require('sweet.js');

module.exports = function(grunt) {
    grunt.initConfig({
        sweetjs: {
            options: {
                sourceMap: true,
                nodeSourceMapSupport: true
            },
            all: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.sjs'],
                    dest: 'src/',
                    ext: '.js'
                }]
            }
        },
        watch: {
            options: {
                nospawn: true
            },
            sweetjs: {
                files: ['src/**/*.sjs'],
                tasks: ['sweetjs:changed']
            }
        }
    });

    grunt.event.on('watch', function(action, filepath, target) {
        if(action == 'changed' && target == 'sweetjs') {
            var base = filepath.slice(0, filepath.length - path.extname(filepath).length);
            var dest = base + '.js';

            grunt.config.set('sweetjs.changed.src', [filepath]);
            grunt.config.set('sweetjs.changed.dest', dest);
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sweet.js');

    grunt.registerTask('default', ['sweetjs']);
};

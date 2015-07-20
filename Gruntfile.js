'use strict';

module.exports = function (grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        copy : {
            app : {
                expand: true,
                cwd : 'app',
                src : ['**', '!/public/vendor/**'],
                dest : 'build'
            },
            pkg : {
                src : 'package.json',
                dest : 'build/package.json'
            },
            bower : {
                src: 'bower.json',
                dest: 'build/bower.json'
            }
        },

        buildGhPages : {
            deploy : {
                options : {
                    dist : 'build',
                    build_branch : 'deploy/<%= environment %>',
                    exclude : ['cache']
                }
            }
        },

        shell : {
            options : {
                stdout : true,
                stderr : true
            },
            deploy : {
                command : 'git push <%= environment %> deploy/<%= environment %>'
            }
        },

        prompt : {
            deploy : {
                options : {
                    questions : [
                        {
                            config : 'environment',
                            type : 'list',
                            message : 'Environment to deploy to:',
                            default : 'staging',
                            choices : ['staging', 'production']
                        }
                    ]
                }
            }
        },

        replace : {
            configs : {
                src : ['build/configs/*.json'],
                overwrite : true,
                replacements: [
                    {
                        from: 'vagrant',
                        to: 'ts'
                    },
                    {
                        from : '"dev"',
                        to : '"staging"'
                    },
                    {
                        from: 'cambium/app',
                        to: 'cambium'
                    }
                ]
            }
        }
    });

    grunt.registerTask('deploy', ['prompt:deploy', 'copy:app', 'copy:pkg', 'copy:bower', 'replace:configs', 'buildGhPages:deploy', 'shell:deploy'])
};
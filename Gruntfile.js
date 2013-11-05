// Generated on 2013-11-04 using generator-angular 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  // configurable paths
  var yeomanConfig = {
    app:  'app',
    dist: 'dist',
    tmp:  '.tmp'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      typescript: {
        files: ['<%= yeoman.app %>/scripts/**/*.ts'],
        tasks: ['typescript'],
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/**/*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['copy:styles', 'autoprefixer']
      },
      imagemin: {
        files: ['<%= yeoman.app %>/images/**/*.{png,jpg,jpeg}'],
        tasks: ['imagemin:tmp', 'compass:server']
      },
      copygifs: {
        files: ['<%= yeoman.app %>/images/**/*.gif'],
        tasks: ['copy:gifs_tmp', 'compass:server']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/**/*.html',
          '.tmp/styles/**/*.css',
          '{.tmp,<%= yeoman.app %>}/**/*.js',
          '<%= yeoman.app %>/images/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    autoprefixer: {
      options: ['last 1 version'],
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            // need this to make the /test and /app directories available to karam
            '.',
            // need this to make the styles directory available
            '.tmp',
            // need this to make index-e2e.html and other non-tmp statics available
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // FIXME tslib.js shouldn't be generated into the scripts directory in the first place,
    // but rather into either a .tmp or a .dist one; will set this up later
    clean: {
      dist: {
			  files: [{
				  dot: true,
					src: [
					  '.tmp',
						'<%= yeoman.dist %>/*',
						'<%= yeoman.app %>/scripts/tslib.js',
          ]
				}]
			},
      server: ['<%= yeoman.app %>/scripts/tslib.js', '.tmp'],
      unit: ['<%= yeoman.app %>/scripts/tslib.js'],
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
			]
    },
    typescript: {
      base: {
        src: [
          '<%= yeoman.app %>/scripts/app.ts',
          '<%= yeoman.app %>/scripts/**/*.ts',
        ],
        dest: '<%= yeoman.app %>/scripts/tslib.js',
        options: {
          sourcemap: true
        }
      }
    },
    compass: {
      options: {
        sassDir:        '<%= yeoman.app %>/styles',
        // this task outputs everything to .tmp; for the production build,
        // the cssmin task will pick up .css files from .tmp and move them to dist
        cssDir:         '<%= yeoman.tmp %>/styles',
        imagesDir:      '<%= yeoman.tmp %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir:       '<%= yeoman.app %>/styles/fonts',
        importPath:     '<%= yeoman.app %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false
      },
      dist: {
        options: {
          imagesDir:  '<%= yeoman.tmp%>/images',
        }
      },
      server: {
        options: {
          debugInfo: false
        }
      }
    },
    concat: {
      // this empty config will be appended by the usemin task, based on the
      // <!-- build:js --> blocks in index.html
    },
    useminPrepare: {
      html: [
        '<%= yeoman.app %>/index.html',
        // TODO once we have a backend server always running, we can
        // remove the e2e index, but for now it's nice to have
        '<%= yeoman.app %>/index-e2e.html'
      ],
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      // first pass tasks 'html' and 'css'
      html: [
        '<%= yeoman.dist %>/index.html',
        '<%= yeoman.dist %>/index-e2e.html',
        '<%= yeoman.dist %>/views/**/*.html',
        '<%= yeoman.dist %>/pages/**/*.html',
      ],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      // second pass of usemin to update the reference to the templates.js file
      // that was generated _after_ the first pass of usemin, since it needs to
      // bundle together .html files _after_ asset references in them have been
      // updated with revved filenames
      templates: {
        src: ['<%= yeoman.dist %>/index.html'],
        options: {
          type:  'html',
        },
      },
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      tmp: {
        files: [{
          expand: true,
          cwd:    '<%= yeoman.app %>/images',
          src:    '**/*.{png,jpg,jpeg}',
          dest:   '<%= yeoman.tmp %>/images'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src:    '**/*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      // this empty config will be appended by the usemin task, based on the
      // <!-- build:css --> blocks in index.html
    },
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/scripts',
          src: '*.js',
          dest: '<%= yeoman.dist %>/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '<%= yeoman.dist %>/scripts/scripts.js'
          ]
        }
      }
    },
    rev: {
      first: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/**/*.js',
            '<%= yeoman.dist %>/styles/**/*.css',
            '<%= yeoman.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/**/*'
          ]
        }
      },
      second: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/templates.js',
          ]
        }
      }
    },
    copy: {
      gifs_tmp: {
        files: [{
          expand: true,
          cwd:    '<%= yeoman.app %>/images',
          src:    '{,*/}*.gif',
          dest:   '<%= yeoman.tmp %>/images'
        }]
      },
      gifs_dist: {
        files: [{
          expand: true,
          cwd:    '<%= yeoman.app %>/images',
          src:    '{,*/}*.gif',
          dest:   '<%= yeoman.dist %>/images'
        }]
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,txt}',
            // change this to copy only the components necessary for the production dist
            'bower_components/**/*',
            'images/**/*.{gif,webp}',
            'views/**/*.html',
            '*.html',
            // default config
            'config.js',
          ]
        }]
      }
    },
    concurrent: {
      server: [
				'typescript',
				'imgcompass',
      ],
      test: [
				'typescript',
				'imgcompass',
      ],
      dist: [
				'typescript:dist',
				'imgcompass:dist',
        'htmlmin'
      ]
    },
    karma: {
      unit: {
        configFile: 'test/karma.conf.js'
      },
      unit_watch: {
        configFile: 'test/karma.conf.js',
        singleRun: false,
        autoWatch: true
      },
      e2e: {
        configFile: 'test/karma-e2e.conf.js'
      },
      e2e_watch: {
        configFile: 'test/karma-e2e.conf.js',
        singleRun: false,
        autoWatch: true
      }
    },
    html2js: {
      options: {
        base: '<%= yeoman.dist %>',
        module: 'angtsTemplates',
      },
      main: {
        src:  ['<%= yeoman.dist %>/views/**/*.html'],
        dest: '<%= yeoman.dist %>/scripts/templates.js',
      }
    },
    verifybuild: {
      options: {
        exist: [
          'index.html',
        ],
        revved: [
          'scripts/scripts.js',
          'scripts/templates.js',
          'styles/styles.css',
        ],
        revvedRefs: {
          'index.html': [
            'scripts/scripts.js',
            'scripts/templates.js',
            'styles/styles.css',
          ],
          'scripts/templates.js': [
            'images/nested/many/levels/deep/bullet.png',
          ],
          'styles/styles.css': [
            'images/nested/many/levels/deep/bullet.png',
          ],
        },
      }
    }
  });


  /////////  COMPASS AND IMAGE COMPRESSION  ////////
  // we want to run png and jpeg optimization before we run
  // compass, so that optimized images are inlined into the resulting
  // .css files. We also want to copy .gif files over straight.
  grunt.registerTask('imgcompass', function(target) {
    if (target === 'dist') {
      grunt.task.run([
        'imagemin:dist',
        'copy:gifs_dist',
        'compass:dist',
      ]);
    }
    else {
      grunt.task.run([
        'imagemin:tmp',
        'copy:gifs_tmp',
        'compass:server'
      ]);
    }
  })

  /////////  DEV SERVER  ////////
  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  /////////  UNIT and END-TO-END TESTS  ////////

  grunt.registerTask('test', [
    'unit',
    'e2e'
  ]);

  grunt.registerTask('unit', [
    //'jshint:dev',
    'clean:unit',
    'typescript',
    'karma:unit'
  ]);

  grunt.registerTask('unit_watch', [
    //'jshint:dev',
    'clean:unit',
    'typescript',
    'karma:unit_watch'
  ]);

  grunt.registerTask('e2e', [
    //'jshint:dev',
    'clean:server',
    'concurrent:test',
    'connect:test',
    'karma:e2e'
  ]);

  grunt.registerTask('e2e_watch', [
    //'jshint:dev',
    'clean:server',
    'concurrent:test',
    'connect:test',
    'karma:e2e_watch'
  ]);

  /////////  PRODUCTION DISTRIBUTION  ////////
  grunt.registerTask('build', [
    'clean:dist',
    'typescript',
    //'jshint:all',
    'test',
    'imgcompass:dist',

    'useminPrepare',
    'autoprefixer',
    'concat',
    'cssmin',
    'copy:dist',
    // from what I understand, cdnify only moves google cdn linked scripts
    // out of the usemin's build comment blocks; we don't need to worry about that
    // 'cdnify',
    'ngmin',
    'rev:first',
    //'uglify'
    'usemin:html',
    'usemin:css',

    'html2js',
    'rev:second',
    'usemin:templates',
    'verifybuild',
  ]);

  grunt.registerTask('default', ['typescript']);
};

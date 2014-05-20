//wrapper function
module.exports = function(grunt) {
  // Configuration meat and potatoes
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), //Loading contents of package.json and storing data to pkg parameter
    //task - concat is the first task for joining files
    concat: {
      options: {
        separator: ';'
      },
      //target - can name whatever you want as long as its a valid js identifier and use camelcase. Can create as many targets as you want
      dist: {
        //Compact Format - used to run tasks individually 
        // src: ['src/**/*.js'],
        // dest: 'dist/<%= pkg.name %>.js'

        //Files Object Format - dest is the key and source is the value. Serperate with comma.
        // files: {
        //   'dist/<%= pkg.name %>.js' :  ['src/**/*.js'],
        //   'dist/plugins.js' : ['plugins/*.js']
        // }

        //Files Array Format - dest is the key and source is the value
        files: [
          { src: ['src/**/*.js'], dest: 'dist/<%= pkg.name %>.js' },
          { src: ['plugins/*.js'], dest: 'dist/plugins.js' }
        ]
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  //Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  //Task Lists
  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};
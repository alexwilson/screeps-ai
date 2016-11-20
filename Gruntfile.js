// DISCLAIMER: I am awful at Gruntfiles.
module.exports = function(grunt) {

  // Import grunt-env and grunt-screeps.
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-screeps');

  // Configure env:screeps, and configure Screeps:dist with template variables.
  grunt.initConfig({
    env: {
      screeps: {
        src: ".env"
      }
    },
    screeps: {
      options: {
        email: '<%= SCREEPS_EMAIL %>',
        password: '<%= SCREEPS_PASSWORD %>'
      },
      dist: {
        src: ['src/*.js']
      }
    }
  });

  // Register templates from .env file.
  grunt.registerTask('screepsLoadFromEnv', 'Screeps Environment Configuration', () => {
    grunt.config('SCREEPS_EMAIL', process.env.SCREEPS_EMAIL);
    grunt.config('SCREEPS_PASSWORD', process.env.SCREEPS_PASSWORD);
    grunt.log.ok();
  });

  // Finally, register `grunt deploy` task.
  grunt.registerTask('deploy', [
    'env:screeps',
    'screepsLoadFromEnv',
    'screeps'
  ]);

}

module.exports = {
  ci: {
    collect: {
      staticDistDir: './build',
      numberOfRuns: 1,
      isSinglePageApplication: true,
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/code',
        'http://localhost:3000/music',
        'http://localhost:3000/music/rasberry-vines',
        'http://localhost:3000/moodboard',
        'http://localhost:3000/about',
        'http://localhost:3000/credits',
        // 'http://localhost:3000/site-map',
        'http://localhost:3000/gibberish'
      ],

      settings: {
        //set which categories you want to run here.
        onlyCategories: ['accessibility', 'performance', 'seo']
      },
      assert: {
        assertions: {
          'categories:performance': ['error', { minScore: 0.1 }],
          'categories:accessibility': ['error', { minScore: 0.1 }],
          'categories:seo': ['error', { minScore: 0.1 }]
        }
      },
      upload: {
        // upload options here
        target: 'temporary-public-storage'
      },
      server: {
        // server options here
      },
      wizard: {
        // wizard options here
      }
    }
  }
};

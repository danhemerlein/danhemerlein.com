/**
 * adds a links (object) property to the fields object of music projects
 * @param {array} arr
 */

const linkKeys = [
  'spotify',
  'bandcamp',
  'apple',
  'tidal',
  'amazon',
  'deezer',
  'napster',
  'google play',
  'soundcloud'
];

const createLinksObject = (arr) => {
  // eslint-disable-next-line array-callback-return
  arr.map((project) => {
    const k = [];
    for (const key of linkKeys) {
      const o = {
        title: '',
        link: ''
      };
      if (key === 'google play' && project.fields.googlePlay) {
        o.title = 'google play';
        o.link = project.fields.googlePlay;
        k.push(o);
      } else {
        o.title = key;
        o.link = project.fields[key];
        if (project.fields[key] !== undefined) {
          k.push(o);
        }
      }
    }
    project.fields.links = k;
  });
};

export default createLinksObject;

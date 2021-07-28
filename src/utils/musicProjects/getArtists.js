function getArtists(projects) {
  const artists = projects.map((project) => {
    return project.fields.artist;
  });

  return [...new Set(artists)].sort();
}

export default getArtists;

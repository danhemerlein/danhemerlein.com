import * as styles from './AbletonRecipesAdmin.styles';

const DataToAddPre = ({ values }) => {
  const {
    name,
    link,
    id,
    tags,
    genrePrimary,
    genreSecondary,
    originalPoster,
    platform,
    datePosted,
    datePostedJS,
    dateAdded
  } = values;
  return (
    <styles.StyledPre>
      <styles.Paragraph>name: "{name}"</styles.Paragraph>
      <styles.Paragraph>link: "{link}"</styles.Paragraph>

      <styles.Paragraph>id (automatically generated): "{id}"</styles.Paragraph>

      <styles.Paragraph>tags: [{tags}]</styles.Paragraph>
      <styles.Paragraph>primary genre: "{genrePrimary}"</styles.Paragraph>

      <styles.Paragraph>secondary genre: "{genreSecondary}"</styles.Paragraph>

      <styles.Paragraph>original poster: "{originalPoster}"</styles.Paragraph>

      <styles.Paragraph>platform: "{platform}"</styles.Paragraph>
      <styles.Paragraph>date posted: "{datePosted}"</styles.Paragraph>
      <styles.Paragraph>
        date postedJS (automatically generated): "{datePostedJS}"
      </styles.Paragraph>

      {/* <styles.Paragraph> */}
      {/* date added (automatically generated): "{dateAdded}" */}
      {/* </styles.Paragraph> */}
    </styles.StyledPre>
  );
};

DataToAddPre.propTypes = {};

export default DataToAddPre;

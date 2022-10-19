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
    uid,
    dateCreated,
    price,
    type
  } = values;
  return (
    <styles.StyledPre>
      <styles.Paragraph>name: "{name}"</styles.Paragraph>
      <styles.Paragraph>link: "{link}"</styles.Paragraph>

      <styles.Paragraph>id (automatically generated): "{id}"</styles.Paragraph>
      <styles.Paragraph>
        uid (automatically generated): "{uid}"
      </styles.Paragraph>
      <styles.Paragraph>type: "{type}"</styles.Paragraph>
      <styles.Paragraph>
        dateCreated "{dateCreated.toString()}"
      </styles.Paragraph>

      <styles.Paragraph>tags: [{JSON.stringify(tags)}]</styles.Paragraph>
      <styles.Paragraph>primary genre: "{genrePrimary}"</styles.Paragraph>

      <styles.Paragraph>secondary genre: "{genreSecondary}"</styles.Paragraph>

      <styles.Paragraph>original poster: "{originalPoster}"</styles.Paragraph>

      <styles.Paragraph>platform: "{platform}"</styles.Paragraph>
      <styles.Paragraph>price: "{price}"</styles.Paragraph>
      <styles.Paragraph>date posted: "{datePosted}"</styles.Paragraph>
      <styles.Paragraph>
        date postedJS (automatically generated): "{datePostedJS}"
      </styles.Paragraph>
    </styles.StyledPre>
  );
};

DataToAddPre.propTypes = {};

export default DataToAddPre;

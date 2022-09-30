import Button from 'components/base/Button';
import { StyledSelect } from 'components/base/FormElements/StyledSelect';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { FlexContainer } from 'styles/elements';
import {
  deleteAllDocsInACollection,
  getAllDocsInACollection
} from 'utils/firebaseHelpers';
import { createReactSelectOptions } from 'utils/lib';
import * as styles from './AbletonRecipesAdmin.styles';
import {
  createPostDocumentID,
  datefromString,
  stringFromDate
} from './helperFuntions';
import { initialValues } from './initialValues';
import { createPostDocumentSchema } from './validationSchema';

const handleDelete = (collection) => {
  if (
    window.confirm(
      `do you really want to delete all the posts in the ${collection} collection`
    )
  ) {
    deleteAllDocsInACollection(collection);
  }
};

const AbletonRecipesAdmin = () => {
  const [platforms, setPlatforms] = useState([]);
  const [ops, setOPs] = useState([]);
  const [tags, setTags] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      const ops = await getAllDocsInACollection('original posters');
      const p = await getAllDocsInACollection('platforms');
      const t = await getAllDocsInACollection('tags');
      const g = await getAllDocsInACollection('genres');

      setOPs(ops);
      setPlatforms(p);
      setTags(t);
      setGenres(g);
    };

    fetchAllData();
  }, []);

  return (
    <styles.StyledFlexContainer
      items="center"
      justify="center"
      direction="column"
    >
      {/* <Button
        clickHandler={() => {
          handleDelete('posts');
        }}
      >
        clear posts collection
      </Button> */}

      <styles.HeadlingOne>new recipe</styles.HeadlingOne>
      <Formik
        initialValues={initialValues}
        validationSchema={createPostDocumentSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, setFieldValue, setFieldTouched }) => {
          const setDateValue = (date) => {
            setFieldTouched('datePosted', true, false);
            setFieldValue('datePosted', date);
            setFieldValue('datePostedJS', datefromString(date));
            stringFromDate();
          };

          const dateChangeHandler = (e) => {
            e.preventDefault();
            setDateValue(e.target.value);
          };

          return (
            <styles.StyledFlexContainer>
              <styles.StyledFrom>
                <styles.FieldContainer>
                  <styles.Paragraph bold>name</styles.Paragraph>

                  <styles.StyledField
                    id="name"
                    name="name"
                    placeholder="name"
                  />
                </styles.FieldContainer>

                <styles.FieldContainer>
                  <styles.Paragraph bold>link</styles.Paragraph>

                  <styles.StyledField
                    id="link"
                    name="link"
                    placeholder="link"
                    onChange={(e) => {
                      const val = e.target.value;

                      setFieldValue('link', val);
                      setFieldValue('id', createPostDocumentID(val));
                    }}
                  />
                </styles.FieldContainer>

                <styles.FieldContainer>
                  <styles.Paragraph bold>tags</styles.Paragraph>

                  <StyledSelect
                    className="react-select-container"
                    classNamePrefix="react-select"
                    onChange={(e) => {
                      setFieldValue('tags', e);
                    }}
                    options={createReactSelectOptions(tags)}
                    isMulti
                  />
                </styles.FieldContainer>

                <styles.FieldContainer>
                  <styles.Paragraph bold>primary genre</styles.Paragraph>

                  <StyledSelect
                    className="react-select-container"
                    classNamePrefix="react-select"
                    name="genrePrimary"
                    options={createReactSelectOptions(genres)}
                    onChange={(e) => {
                      setFieldValue('genrePrimary', e.value);
                    }}
                  />
                </styles.FieldContainer>

                <styles.FieldContainer>
                  <styles.Paragraph bold>secondary genre</styles.Paragraph>

                  <StyledSelect
                    className="react-select-container"
                    classNamePrefix="react-select"
                    name="genrePrimary"
                    options={createReactSelectOptions(genres)}
                    onChange={(e) => {
                      setFieldValue('genreSecondary', e.value);
                    }}
                  />
                </styles.FieldContainer>

                <styles.FieldContainer>
                  <styles.Paragraph bold>original poster</styles.Paragraph>

                  <StyledSelect
                    className="react-select-container"
                    classNamePrefix="react-select"
                    name="ops"
                    options={createReactSelectOptions(ops)}
                    onChange={(e) => {
                      setFieldValue('ops', e.value);
                    }}
                  />
                </styles.FieldContainer>

                <styles.FieldContainer>
                  <styles.Paragraph bold>platform</styles.Paragraph>
                  <StyledSelect
                    className="react-select-container"
                    classNamePrefix="react-select"
                    name="platforms"
                    options={createReactSelectOptions(platforms)}
                    onChange={(e) => {
                      setFieldValue('platforms', e.value);
                    }}
                  />
                </styles.FieldContainer>

                <styles.FieldContainer>
                  <styles.Paragraph bold>date posted</styles.Paragraph>

                  <styles.StyledDateInput
                    type="date"
                    id="date"
                    name="datePosted"
                    max={stringFromDate()}
                    onChange={dateChangeHandler}
                  />
                </styles.FieldContainer>

                <FlexContainer items="center" justify="center">
                  <Button type="submit">submit</Button>
                </FlexContainer>
              </styles.StyledFrom>
              <styles.StyledPre>
                <styles.Paragraph>name: "{values.name}"</styles.Paragraph>
                <styles.Paragraph>link: "{values.link}"</styles.Paragraph>

                <styles.Paragraph>
                  id (automatically generated): "{values.id}"
                </styles.Paragraph>

                <styles.Paragraph>tags: [{values.tags}]</styles.Paragraph>
                <styles.Paragraph>
                  primary genre: "{values.genrePrimary}"
                </styles.Paragraph>

                <styles.Paragraph>
                  secondary genre: "{values.genreSecondary}"
                </styles.Paragraph>

                <styles.Paragraph>
                  original poster: "{values.originalPoster}"
                </styles.Paragraph>

                <styles.Paragraph>
                  platform: "{values.platform}"
                </styles.Paragraph>
                <styles.Paragraph>
                  date posted: "{values.datePosted}"
                </styles.Paragraph>
                <styles.Paragraph>
                  date postedJS (automatically generated): "
                  {values.datePostedJS}"
                </styles.Paragraph>
              </styles.StyledPre>
            </styles.StyledFlexContainer>
          );
        }}
      </Formik>
    </styles.StyledFlexContainer>
  );
};

AbletonRecipesAdmin.propTypes = {};

export default AbletonRecipesAdmin;

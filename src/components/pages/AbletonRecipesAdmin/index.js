import Button from 'components/base/Button';
import { ErrorMessage, Formik } from 'formik';

import { StyledSelect } from 'components/base/FormElements/StyledSelect';
import { useEffect, useState } from 'react';
import { FlexContainer } from 'styles/elements';
import {
  addDocument,
  deleteAllDocsInACollection,
  getAllDocsInACollection
} from 'utils/firebaseHelpers';
import { createReactSelectOptions } from 'utils/lib';
import * as styles from './AbletonRecipesAdmin.styles';
import DataToAddPre from './DataToAddPre';
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
          values.dateAdded = Date.now();
          addDocument('posts', values);
        }}
      >
        {({ values, errors, setFieldValue, setFieldTouched }) => {
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

                  <styles.ErrorParagraph>
                    <ErrorMessage name="name" />
                  </styles.ErrorParagraph>
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

                  <styles.ErrorParagraph>
                    <ErrorMessage name="link" />
                  </styles.ErrorParagraph>
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

                  <styles.ErrorParagraph>
                    <ErrorMessage name="tags" />
                  </styles.ErrorParagraph>
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

                  <styles.ErrorParagraph>
                    <ErrorMessage name="genrePrimary" />
                  </styles.ErrorParagraph>
                </styles.FieldContainer>

                <styles.FieldContainer>
                  <styles.Paragraph bold>secondary genre</styles.Paragraph>

                  <StyledSelect
                    className="react-select-container"
                    classNamePrefix="react-select"
                    name="genreSecondary"
                    options={createReactSelectOptions(genres)}
                    onChange={(e) => {
                      setFieldValue('genreSecondary', e.value);
                    }}
                  />

                  <styles.ErrorParagraph>
                    <ErrorMessage name="genreSecondary" />
                  </styles.ErrorParagraph>
                </styles.FieldContainer>

                <styles.FieldContainer>
                  <styles.Paragraph bold>original poster</styles.Paragraph>

                  <StyledSelect
                    className="react-select-container"
                    classNamePrefix="react-select"
                    name="originalPoster"
                    options={createReactSelectOptions(ops)}
                    onChange={(e) => {
                      setFieldValue('originalPoster', e.value);
                    }}
                  />

                  <styles.ErrorParagraph>
                    <ErrorMessage name="originalPoster" />
                  </styles.ErrorParagraph>
                </styles.FieldContainer>

                <styles.FieldContainer>
                  <styles.Paragraph bold>platform</styles.Paragraph>
                  <StyledSelect
                    className="react-select-container"
                    classNamePrefix="react-select"
                    name="platforms"
                    options={createReactSelectOptions(platforms)}
                    onChange={(e) => {
                      setFieldValue('platform', e.value);
                    }}
                  />

                  <styles.ErrorParagraph>
                    <ErrorMessage name="platform" />
                  </styles.ErrorParagraph>
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

                  <styles.ErrorParagraph>
                    <ErrorMessage name="datePosted" />
                  </styles.ErrorParagraph>
                </styles.FieldContainer>

                <FlexContainer items="center" justify="center">
                  <Button type="submit">submit</Button>
                </FlexContainer>
              </styles.StyledFrom>
              <DataToAddPre values={values} />
            </styles.StyledFlexContainer>
          );
        }}
      </Formik>
    </styles.StyledFlexContainer>
  );
};

AbletonRecipesAdmin.propTypes = {};

export default AbletonRecipesAdmin;

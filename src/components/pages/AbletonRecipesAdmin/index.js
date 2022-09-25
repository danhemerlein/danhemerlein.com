import { StyledSelect } from 'components/base/FormElements/StyledSelect';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { getAllDocsInACollection } from 'utils/firebaseHelpers';
import { createReactSelectOptions } from 'utils/lib';
import * as styles from './AbletonRecipesAdmin.styles';

const initialValues = {
  Name: '',
  link: '',
  Tags: [],
  genre: [],
  'original poster': '',
  platform: '',
  'date posted': ''
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
    <div>
      <h1>create receipe</h1>

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <div>
                <styles.Paragraph bold>name</styles.Paragraph>

                <Field id="Name" name="Name" placeholder="platform" />
              </div>

              <div>
                <styles.Paragraph bold>link</styles.Paragraph>

                <Field id="link" name="link" placeholder="link" />
              </div>

              <div>
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
              </div>

              <div>
                <styles.Paragraph bold>genres</styles.Paragraph>

                <StyledSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  name="genres"
                  options={createReactSelectOptions(genres)}
                  onChange={(e) => {
                    setFieldValue('genres', e);
                  }}
                  isMulti
                />
              </div>

              <div>
                <styles.Paragraph bold>original posters</styles.Paragraph>

                <StyledSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  name="ops"
                  options={createReactSelectOptions(ops)}
                  onChange={(e) => {
                    setFieldValue('ops', e);
                  }}
                  isMulti
                />
              </div>

              <div>
                <styles.Paragraph bold>platforms</styles.Paragraph>
                <StyledSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  name="platforms"
                  options={createReactSelectOptions(platforms)}
                  onChange={(e) => {
                    setFieldValue('platforms', e);
                  }}
                  isMulti
                />
              </div>

              <div>
                <styles.Paragraph bold>date posted</styles.Paragraph>

                <Field
                  id="date posted"
                  name="date posted"
                  placeholder="date posted"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

AbletonRecipesAdmin.propTypes = {};

export default AbletonRecipesAdmin;

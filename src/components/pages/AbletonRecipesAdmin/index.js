import Button from 'components/base/Button';
import { StyledSelect } from 'components/base/FormElements/StyledSelect';
import { ErrorMessage, Field, Formik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { FlexContainer } from 'styles/elements';
import {
  addDocument,
  checkDocumentExistenceById,
  getAllDocsInACollection,
  getDocumentById
} from 'utils/firebaseHelpers';
import { auth } from 'utils/firestore';
import { createReactSelectOptions } from 'utils/lib';
import AdminCheck from '../AbletonRecipes/AdminCheck';
import { UserContext } from '../AbletonRecipes/context.js';
import { getValues } from '../AbletonRecipes/firebaseHelpers';
import * as styles from './AbletonRecipesAdmin.styles';
import DataToAddPre from './DataToAddPre';
import {
  createPostDocumentID,
  datefromString,
  stringFromDate
} from './helperFuntions';
import { initialValues } from './initialValues';
import Modal from './Modal';

const CustomNoOptionsMessage = (
  setModalOpen,
  setCollectionToAddTo,
  collection
) => {
  return (
    <FlexContainer justify="center" items="center">
      <Button
        type="button"
        clickHandler={() => {
          setModalOpen(true);
          setCollectionToAddTo(collection);
        }}
      >
        that value does not exist in {collection}, create it?
      </Button>
    </FlexContainer>
  );
};

const AbletonRecipesAdmin = () => {
  const [platforms, setPlatforms] = useState([]);
  const [ops, setOPs] = useState([]);
  const [tags, setTags] = useState([]);
  const [genres, setGenres] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [types, setTypes] = useState([]);
  const [collectionToAddTo, setCollectionToAddTo] = useState('');
  const [formErrorSuccess, setFormErrorSuccess] = useState({
    error: false,
    message: ''
  });

  const [modalFormErrorSuccess, setModalFormErrorSuccess] = useState({
    error: false,
    message: ''
  });

  useEffect(() => {
    const fetchAllData = async () => {
      const ops = await getAllDocsInACollection('original posters');
      const p = await getAllDocsInACollection('platforms');
      const t = await getAllDocsInACollection('tags');
      const g = await getAllDocsInACollection('genres');
      const ty = await getAllDocsInACollection('types');

      setOPs(ops);
      setPlatforms(p);
      setTags(t);
      setGenres(g);
      setTypes(ty);
    };

    fetchAllData();
  }, []);

  const postFormSubmitHandler = async (values) => {
    // there's a bug here - with get values
    values.tags = getValues(values.tags);

    const { genrePrimary, genreSecondary, name } = values;

    if (
      genrePrimary.length &&
      genreSecondary.length &&
      genrePrimary === genreSecondary
    ) {
      setFormErrorSuccess({
        error: true,
        message: 'ERROR: genres must be unique of each other'
      });
    } else if (values.tags.length > 10) {
      setFormErrorSuccess({
        error: true,
        message: 'ERROR: 10 tags is the maximum'
      });
    } else {
      const d = await addDocument('posts', values);

      if (d === undefined) {
        setFormErrorSuccess({
          error: false,
          message: `Sucess: ${name} added to ${collectionToAddTo}`
        });
      } else {
        setFormErrorSuccess({
          error: true,
          message: `${d}`
        });
      }
    }
  };

  const modalSubmitHandler = async (collectionToAddTo, values) => {
    const d = await addDocument(collectionToAddTo, {
      id: values.value,
      value: values.value
    });

    if (d === undefined) {
      setModalFormErrorSuccess({
        error: false,
        message: `Sucess: ${values.value} added to ${collectionToAddTo}`
      });
    } else {
      setModalFormErrorSuccess({
        error: true,
        message: `${d}`
      });
    }
  };

  const [user, setUser] = useState(null);

  const value = useMemo(() => {
    return { user, setUser };
  }, [user]);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      const userExists = await checkDocumentExistenceById('users', user.uid);

      if (userExists) {
        const u = await getDocumentById('users', user.uid);

        setUser({
          uid: u.uid,
          email: u.email,
          name: u.name,
          roles: {
            subscriber: u.roles.subscriber,
            admin: u.roles.admin
          }
        });
      }
    });
  }, []);

  return (
    <UserContext.Provider value={value}>
      <AdminCheck>
        <styles.StyledFlexContainer
          items="center"
          justify="center"
          direction="column"
        >
          <styles.HeadlingOne>new recipe</styles.HeadlingOne>

          <styles.Paragraph error={formErrorSuccess.error}>
            {formErrorSuccess.message}
          </styles.Paragraph>
          {/* <Overlay /> */}
          {modalOpen ? (
            <Modal
              setModalOpen={setModalOpen}
              collectionToAddTo={collectionToAddTo}
              setFormErrorSuccess={setFormErrorSuccess}
              formErrorSuccess={formErrorSuccess}
              submitHandler={modalSubmitHandler}
              modalFormErrorSuccess={modalFormErrorSuccess}
            />
          ) : null}

          <Formik
            initialValues={initialValues}
            validator={() => {
              return {};
            }}
            onSubmit={(values) => {
              postFormSubmitHandler(values);
            }}
          >
            {({ values, setFieldValue, setFieldTouched }) => {
              const setDateValue = (date) => {
                setFieldTouched('datePosted', true, false);
                setFieldValue('datePosted', date);
                setFieldValue('datePostedJS', datefromString(date));
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
                          setFieldValue(
                            'id',
                            createPostDocumentID(val, values.name)
                          );
                          setFieldValue(
                            'uid',
                            createPostDocumentID(val, values.name)
                          );
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
                        components={{
                          NoOptionsMessage: () => {
                            return CustomNoOptionsMessage(
                              setModalOpen,
                              setCollectionToAddTo,
                              'tags'
                            );
                          }
                        }}
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
                        components={{
                          NoOptionsMessage: () => {
                            return CustomNoOptionsMessage(
                              setModalOpen,
                              setCollectionToAddTo,
                              'genres'
                            );
                          }
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
                        components={{
                          NoOptionsMessage: () => {
                            return CustomNoOptionsMessage(
                              setModalOpen,
                              setCollectionToAddTo,
                              'genres'
                            );
                          }
                        }}
                      />

                      <styles.ErrorParagraph>
                        <ErrorMessage name="genreSecondary" />
                      </styles.ErrorParagraph>
                    </styles.FieldContainer>

                    <styles.FieldContainer>
                      <styles.Paragraph bold>type</styles.Paragraph>

                      <StyledSelect
                        className="react-select-container"
                        classNamePrefix="react-select"
                        name="type"
                        options={createReactSelectOptions(types)}
                        onChange={(e) => {
                          setFieldValue('type', e.value);
                        }}
                        components={{
                          NoOptionsMessage: () => {
                            return CustomNoOptionsMessage(
                              setModalOpen,
                              setCollectionToAddTo,
                              'types'
                            );
                          }
                        }}
                      />

                      <styles.ErrorParagraph>
                        <ErrorMessage name="types" />
                      </styles.ErrorParagraph>
                    </styles.FieldContainer>

                    <styles.FieldContainer>
                      <styles.Paragraph bold>price</styles.Paragraph>

                      <Field name="price" type="number" />

                      <styles.ErrorParagraph>
                        <ErrorMessage name="price" />
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
                        components={{
                          NoOptionsMessage: () => {
                            return CustomNoOptionsMessage(
                              setModalOpen,
                              setCollectionToAddTo,
                              'original posters'
                            );
                          }
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
                        components={{
                          NoOptionsMessage: () => {
                            return CustomNoOptionsMessage(
                              setModalOpen,
                              setCollectionToAddTo,
                              'platforms'
                            );
                          }
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
                      <Button
                        type="submit"
                        clickHandler={(_) => {
                          return _;
                        }}
                      >
                        submit
                      </Button>
                    </FlexContainer>
                  </styles.StyledFrom>
                  <DataToAddPre values={values} />
                </styles.StyledFlexContainer>
              );
            }}
          </Formik>

          <Toaster
            toastOptions={{
              className: 'toaster',
              style: {
                border: '1px solid',
                borderColor: formErrorSuccess.error ? 'red' : 'green',
                padding: '16px',
                borderRadius: '0',
                color: formErrorSuccess.error ? 'red' : 'green',
                fontSize: '16px'
              }
            }}
          />
        </styles.StyledFlexContainer>
      </AdminCheck>
    </UserContext.Provider>
  );
};

AbletonRecipesAdmin.propTypes = {};

export default AbletonRecipesAdmin;

import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
  Platform,
  AlertIOS,
  Alert,
  Dimensions,
} from "react-native";
import axios from "axios";
import colors from "../config/colors";
import { UserAudioInput } from "../components/Audio/AudioInput";
import { skipLogic } from "../utils/skipLogic";
import {
  UserTextInput,
  UserPhoneInput,
  UserDateInput,
  UserTimeInput,
  UserNoteInput,
  UserImageInput,
  UserVideoInput,
  UserSingleSelectInput,
  UserMultySelectInput,
  UserSliderScaletInput,
  UserLikertScaletInput,
  UserRatingInput,
  UserSectionBreakInput,
  UserIntroductoryInput,
  UserSignatureCaptureInput,
  UserImageGeoTagInput,
} from "../components/forms/FormInput";
import SubmitButton from "../components/Button/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import { Formik } from "formik";
import * as yup from "yup";
var { width } = Dimensions.get("window");

function FormDetailsScreen({ route, navigation }) {
  const form = route.params;
  const [questions, setQuestionsDails] = useState([]);
  // const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  // console.log(questions);
  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/agriews/getQuestionnaireByFormId/${form?.id}`
      );
      setQuestionsDails(JSON.parse(data[0].questionnaire));
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const loadOnlineQuestions = async () => {
    setInitLoading(true);
    try {
      setSuccess(false);
      const { data } = await axios.get(
        `/agriews/getQuestionnaireByFormId/${formId}`
      );

      setQuestions(data);
      //set local storage with the questions, with the formId as the key
      await AsyncStorage.setItem(
        `${forms.formId}`,
        JSON.stringify(data.questionDetail)
      );
      setQuestionsDails(data.questionDetail);
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
    } finally {
      setInitLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadOnlineQuestions();
      setRefreshing(false);
    }, 2000);
  };

  //lets get the initial values on the fields
  const initialVars = useMemo(() => {
    const values = {};
    questions?.map((question) => {
      return (values[question.questionId] = "");
    });
    return values;
  }, [questions]);

  const handleSubmitForm = async (values) => {
    console.log(values);
  };

  // if (loading) {
  //   return (
  //     <View
  //       style={{
  //         justifyContent: "center",
  //         alignItems: "center",
  //         display: "flex",
  //         flex: 1,
  //       }}
  //     >
  //       <ActivityIndicator size="large" />
  //       <Text>Loading Questions ...</Text>
  //     </View>
  //   );
  // }

  return (
    <>
      <Header
        HeaderTitle={`${form.formName} Details`}
        borderBottomLeftRadius={30}
        borderBottomRightRadius={30}
        height={width / 2 - 50}
        marginBottom={10}
        justifyContent="center"
      />
      <SafeAreaView style={{ backgroundColor: colors.light }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          style={styles.formContainer}
        >
          <Formik
            initialValues={initialVars}
            enableReinitialize={true}
            onSubmit={(values) => handleSubmitForm(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              setFieldValue,
            }) => {
              return (
                <>
                  <View>
                    {questions &&
                      questions.map((question, i) => {
                        return skipLogic(question, values) ? (
                          <>
                            <View key={i}>
                              {question.type === "tell" ? (
                                <View style={styles.questionCard}>
                                  <UserPhoneInput
                                    name={question.name}
                                    pos={question.questionPosition}
                                    desc={question.description}
                                    type={question.type}
                                    onChange={handleChange(
                                      question.description
                                    )}
                                    keyboardType="numeric"
                                  />
                                </View>
                              ) : question.type === "text" ? (
                                <View style={styles.questionCard}>
                                  <UserTextInput
                                    name={question.name}
                                    pos={question.questionPosition}
                                    desc={question.description}
                                    type={question.type}
                                    onChange={handleChange(
                                      question.description
                                    )}
                                    autoCapitalize="words"
                                    autoCorrect={false}
                                  />
                                </View>
                              ) : question.type === "date" ? (
                                <View style={styles.questionCard}>
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      // justifyContent: "space-between",
                                    }}
                                  >
                                    <UserDateInput
                                      name={question.name}
                                      id={question.questionId}
                                      pos={question.questionPosition}
                                      desc={question.description}
                                      type={question.type}
                                      setFieldValue={setFieldValue}
                                      onChange={handleChange(
                                        question.description
                                      )}
                                      autoCapitalize="words"
                                      autoCorrect={false}
                                    />
                                  </View>
                                </View>
                              ) : question.type === "time" ? (
                                <View style={styles.questionCard}>
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      // justifyContent: "space-between",
                                    }}
                                  >
                                    <UserTimeInput
                                      name={question.name}
                                      pos={question.questionPosition}
                                      desc={question.description}
                                      type={question.type}
                                      onChange={handleChange(
                                        question.description
                                      )}
                                      setFieldValue={setFieldValue}
                                      id={question.name}
                                      autoCorrect={false}
                                    />
                                  </View>
                                </View>
                              ) : question.type === "radiogroup" ? (
                                <View style={styles.questionCard}>
                                  <UserSingleSelectInput
                                    name={question.name}
                                    pos={question.questionPosition}
                                    desc={question.description}
                                    question={question}
                                    id={question.description}
                                    setFieldValue={setFieldValue}
                                    type={question.type}
                                  />
                                </View>
                              ) : question.type === "checkbox" ? (
                                <View style={styles.questionCard}>
                                  <UserSingleSelectInput
                                    name={question.name}
                                    pos={question.questionPosition}
                                    desc={question.description}
                                    question={question}
                                    id={question.description}
                                    setFieldValue={setFieldValue}
                                    type={question.type}
                                    // visibleIf={question.visibleIf}
                                  />
                                </View>
                              ) : question.type === "MultipleChoice" ? (
                                <View style={styles.questionCard}>
                                  <UserMultySelectInput
                                    setFieldValue={setFieldValue}
                                    name={question.name}
                                    pos={question.questionPosition}
                                    desc={question.description}
                                    id={question.description}
                                    type={question.type}
                                    question={question}
                                  />
                                </View>
                              ) : question.type === "location" ? (
                                <View style={styles.questionCard}>
                                  <UserImageGeoTagInput
                                    name={question.name}
                                    pos={question.questionPosition}
                                    desc={question.description}
                                    type={question.type}
                                    setFieldValue={setFieldValue}
                                    id={question.name}
                                  />
                                </View>
                              ) : question.type === "file" ? (
                                <View style={styles.questionCard}>
                                  <View>
                                    <UserImageInput
                                      name={question.name}
                                      pos={question.questionPosition}
                                      desc={question.description}
                                      type={question.type}
                                      setFieldValue={setFieldValue}
                                      id={question.description}
                                    />
                                  </View>
                                </View>
                              ) : null}
                            </View>
                          </>
                        ) : null;
                      })}
                  </View>
                  <View flex style={styles.buttonContainer}>
                    <SubmitButton
                      title="Submit"
                      onPress={handleSubmit}
                      // loading={loading}
                      bwidth={160}
                    />
                  </View>
                </>
              );
            }}
          </Formik>

          <Text>{JSON.stringify(questions, null, 2)}</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default FormDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  formContainer: {
    paddingVertical: 15,
  },
  sectionBreak: {
    marginVertical: 10,
  },
  questionCard: {
    paddingVertical: 15,
    margin: 5,
    borderRadius: 5,
    backgroundColor: colors.white,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 170,
    // marginHorizontal: 2,
    borderRadius: 5,
  },
  headContainer: {
    backgroundColor: colors.primary,
  },
  footContainer: {
    backgroundColor: colors.white,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  headTitle: {
    fontSize: 25,
    color: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  dateButton: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: 55,
    height: 55,
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    textTransform: "uppercase",
    fontSize: 10,
    fontWeight: "bold",
  },
});

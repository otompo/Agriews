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
import {
  UserTextInput,
  UserPhoneInput,
  UserDateInput,
  UserTimeInput,
  UserNoteInput,
  UserImageInput,
  UserVideoInput,
  //UserAudioInput,
  UserSingleSelectInput,
  UserMultySelectInput,
  UserSliderScaletInput,
  UserLikertScaletInput,
  UserRatingInput,
  UserSectionBreakInput,
  UserIntroductoryInput,
  UserSignatureCaptureInput,
  UserImageGeoTagInput,
  SingleSelect,
} from "../components/forms/FormInput";
import SubmitButton from "../components/Button/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import { Formik } from "formik";
import * as yup from "yup";
var { width } = Dimensions.get("window");

function FormDetailsScreen({ route, navigation }) {
  const form = route.params;
  const [questionsDetails, setQuestionsDails] = useState([]);
  // const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  // console.log(questionsDetails);
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
    questionsDetails?.map((question) => {
      return (values[question.questionId] = "");
    });
    return values;
  }, [questionsDetails]);

  const handleSubmitForm = async (values) => {
    try {
      setLoading(true);

      var queryString = Object.keys(values)
        .map((key) => {
          return (
            encodeURIComponent(key) + "=" + encodeURIComponent(values[key])
          );
        })
        .join("&");

      const { data } = await axios.post(`/questionResponse`);

      //update response statistics

      if (Platform.OS === "android") {
        ToastAndroid.showWithGravityAndOffset(
          data.message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      } else {
        AlertIOS.alert(data.message);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      Alert.alert(err.toString());
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flex: 1,
        }}
      >
        <ActivityIndicator size="large" />
        <Text>Loading Questions ...</Text>
      </View>
    );
  }

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
            // validationSchema={formValidationSchema}
            initialValues={initialVars}
            enableReinitialize={true}
            //TODO: add validationScheme/ read about validation scheme and yup
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
                    {questionsDetails &&
                      questionsDetails.map((questionsDetail) => {
                        return (
                          <>
                            <View key={questionsDetail.questionId}>
                              {questionsDetail.type === "tell" ? (
                                <View style={styles.questionCard}>
                                  <UserPhoneInput
                                    name={questionsDetail.name}
                                    pos={questionsDetail.questionPosition}
                                    desc={questionsDetail.description}
                                    type={questionsDetail.type}
                                    onChange={handleChange(
                                      questionsDetail.questionId
                                    )}
                                    questionMandatoryOption={
                                      questionsDetail.questionMandatoryOption
                                    }
                                    keyboardType="numeric"
                                  />
                                </View>
                              ) : questionsDetail.type === "text" ? (
                                <View style={styles.questionCard}>
                                  <UserTextInput
                                    name={questionsDetail.name}
                                    pos={questionsDetail.questionPosition}
                                    desc={questionsDetail.description}
                                    type={questionsDetail.type}
                                    // onChange={handleChange(questionsDetail.id)}
                                    questionMandatoryOption={
                                      questionsDetail.questionMandatoryOption
                                    }
                                    autoCapitalize="words"
                                    autoCorrect={false}
                                  />
                                </View>
                              ) : questionsDetail.type === "date" ? (
                                <View style={styles.questionCard}>
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      // justifyContent: "space-between",
                                    }}
                                  >
                                    <UserDateInput
                                      name={questionsDetail.name}
                                      // id={questionsDetail.questionId}
                                      pos={questionsDetail.questionPosition}
                                      desc={questionsDetail.description}
                                      type={questionsDetail.type}
                                      setFieldValue={setFieldValue}
                                      onChange={handleChange(
                                        questionsDetail.questionId
                                      )}
                                      questionMandatoryOption={
                                        questionsDetail.questionMandatoryOption
                                      }
                                      autoCapitalize="words"
                                      autoCorrect={false}
                                    />
                                  </View>
                                </View>
                              ) : questionsDetail.type === "time" ? (
                                <View style={styles.questionCard}>
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      // justifyContent: "space-between",
                                    }}
                                  >
                                    <UserTimeInput
                                      name={questionsDetail.name}
                                      pos={questionsDetail.questionPosition}
                                      desc={questionsDetail.description}
                                      type={questionsDetail.type}
                                      onChange={handleChange(
                                        questionsDetail.questionId
                                      )}
                                      questionMandatoryOption={
                                        questionsDetail.questionMandatoryOption
                                      }
                                      setFieldValue={setFieldValue}
                                      // id={questionsDetail.questionId}
                                      autoCorrect={false}
                                    />
                                  </View>
                                </View>
                              ) : questionsDetail.type === "radiogroup" ? (
                                <View style={styles.questionCard}>
                                  <UserSingleSelectInput
                                    name={questionsDetail.name}
                                    pos={questionsDetail.questionPosition}
                                    desc={questionsDetail.description}
                                    questionsDetail={questionsDetail}
                                    // id={questionsDetail.questionId}
                                    setFieldValue={setFieldValue}
                                    type={questionsDetail.type}
                                  />
                                </View>
                              ) : questionsDetail.type === "checkbox" ? (
                                <View style={styles.questionCard}>
                                  <SingleSelect
                                    name={questionsDetail.name}
                                    pos={questionsDetail.questionPosition}
                                    desc={questionsDetail.description}
                                    questionsDetail={questionsDetail}
                                    // id={questionsDetail.questionId}
                                    setFieldValue={setFieldValue}
                                    type={questionsDetail.type}
                                  />
                                </View>
                              ) : questionsDetail.type === "MultipleChoice" ? (
                                <View style={styles.questionCard}>
                                  <UserMultySelectInput
                                    setFieldValue={setFieldValue}
                                    name={questionsDetail.name}
                                    pos={questionsDetail.questionPosition}
                                    desc={questionsDetail.description}
                                    type={questionsDetail.type}
                                    questionsDetail={questionsDetail}
                                  />
                                </View>
                              ) : questionsDetail.type === "Number" ? (
                                <View style={styles.questionCard}>
                                  <UserTextInput
                                    name={questionsDetail.name}
                                    pos={questionsDetail.questionPosition}
                                    desc={questionsDetail.description}
                                    type={questionsDetail.type}
                                    onChange={handleChange(
                                      questionsDetail.questionId
                                    )}
                                    questionMandatoryOption={
                                      questionsDetail.questionMandatoryOption
                                    }
                                    keyboardType="numeric"
                                    autoCorrect={false}
                                  />
                                </View>
                              ) : questionsDetail.type === "location" ? (
                                <View style={styles.questionCard}>
                                  <UserImageGeoTagInput
                                    name={questionsDetail.name}
                                    pos={questionsDetail.questionPosition}
                                    desc={questionsDetail.description}
                                    type={questionsDetail.type}
                                    setFieldValue={setFieldValue}
                                    // id={questionsDetail.questionId}
                                  />
                                </View>
                              ) : questionsDetail.type === "Introductory" ? (
                                <View style={styles.sectionBreak}>
                                  <UserIntroductoryInput
                                    name={questionsDetail.name}
                                    pos={questionsDetail.questionPosition}
                                    desc={questionsDetail.description}
                                  />
                                </View>
                              ) : questionsDetail.type === "file" ? (
                                <View style={styles.questionCard}>
                                  <View>
                                    <UserImageInput
                                      name={questionsDetail.name}
                                      pos={questionsDetail.questionPosition}
                                      desc={questionsDetail.description}
                                      type={questionsDetail.type}
                                      setFieldValue={setFieldValue}
                                      // id={questionsDetail.questionId}
                                    />
                                  </View>
                                </View>
                              ) : questionsDetail.type === "ImageGeoTag" ? (
                                <View style={styles.questionCard}>
                                  <View>
                                    <UserImageGeoTagInput
                                      name={questionsDetail.name}
                                      pos={questionsDetail.questionPosition}
                                      desc={questionsDetail.description}
                                      type={questionsDetail.type}
                                      setFieldValue={setFieldValue}
                                      // id={questionsDetail.questionId}
                                    />
                                  </View>
                                </View>
                              ) : questionsDetail.type === "Signature" ? (
                                <View style={styles.questionCard}>
                                  <UserSignatureCaptureInput
                                    name={questionsDetail.name}
                                    pos={questionsDetail.questionPosition}
                                    desc={questionsDetail.description}
                                    type={questionsDetail.type}
                                    setFieldValue={setFieldValue}
                                    // id={questionsDetail.questionId}
                                  />
                                </View>
                              ) : questionsDetail.type === "email" ? (
                                <View style={styles.questionCard}>
                                  <UserTextInput
                                    name={questionsDetail.name}
                                    pos={questionsDetail.questionPosition}
                                    desc={questionsDetail.description}
                                    type={questionsDetail.type}
                                    onChange={handleChange(
                                      questionsDetail.questionId
                                    )}
                                    questionMandatoryOption={
                                      questionsDetail.questionMandatoryOption
                                    }
                                    autoCompleteType="email"
                                    keyboardType="email-address"
                                    autoCorrect={false}
                                  />
                                </View>
                              ) : questionsDetail.type === "audio" ? (
                                <View style={styles.questionCard}>
                                  <UserAudioInput
                                    name={questionsDetail.name}
                                    pos={questionsDetail.questionPosition}
                                    desc={questionsDetail.description}
                                    type={questionsDetail.type}
                                    setFieldValue={setFieldValue}
                                    questionMandatoryOption={
                                      questionsDetail.questionMandatoryOption
                                    }
                                    // id={questionsDetail.questionId}
                                    autoCorrect={false}
                                  />
                                </View>
                              ) : questionsDetail.type === "video" ? (
                                <View style={styles.questionCard}>
                                  <UserVideoInput
                                    name={questionsDetail.name}
                                    pos={questionsDetail.questionPosition}
                                    desc={questionsDetail.description}
                                    type={questionsDetail.type}
                                    setFieldValue={setFieldValue}
                                    questionMandatoryOption={
                                      questionsDetail.questionMandatoryOption
                                    }
                                    // id={questionsDetail.questionId}
                                    autoCorrect={false}
                                  />
                                </View>
                              ) : questionsDetail.type === "LickerScale" ? (
                                <View style={styles.questionCard}>
                                  <UserLikertScaletInput
                                    name={questionsDetail.name}
                                    pos={questionsDetail.questionPosition}
                                    desc={questionsDetail.description}
                                    type={questionsDetail.type}
                                    likerValue={questionsDetail.likerValue.split(
                                      ","
                                    )}
                                    // id={questionsDetail.questionId}
                                    setFieldValue={setFieldValue}
                                  />
                                </View>
                              ) : questionsDetail.type === "Scale" ? (
                                <View style={styles.questionCard}>
                                  <UserSliderScaletInput
                                    name={questionsDetail.name}
                                    pos={questionsDetail.questionPosition}
                                    desc={questionsDetail.description}
                                    type={questionsDetail.type}
                                    // id={questionsDetail.questionId}
                                    maximum={Number(questionsDetail.Maximum)}
                                    minimum={Number(questionsDetail.Minimum)}
                                    setFieldValue={setFieldValue}
                                    questionMandatoryOption={
                                      questionsDetail.questionMandatoryOption
                                    }
                                  />
                                </View>
                              ) : questionsDetail.type === "rating" ? (
                                <View style={styles.questionCard}>
                                  <UserRatingInput
                                    name={questionsDetail.name}
                                    pos={questionsDetail.questionPosition}
                                    desc={questionsDetail.description}
                                    type={questionsDetail.type}
                                    questionMandatoryOption={
                                      questionsDetail.questionMandatoryOption
                                    }
                                    // id={questionsDetail.questionId}
                                    setFieldValue={setFieldValue}
                                  />
                                </View>
                              ) : questionsDetail.type === "note" ? (
                                <View style={styles.questionCard}>
                                  <UserNoteInput
                                    name={questionsDetail.name}
                                    pos={questionsDetail.questionPosition}
                                    desc={questionsDetail.description}
                                    type={questionsDetail.type}
                                    onChange={handleChange(
                                      questionsDetail.questionId
                                    )}
                                    questionMandatoryOption={
                                      questionsDetail.questionMandatoryOption
                                    }
                                    autoCapitalize="words"
                                    autoCorrect={false}
                                  />
                                </View>
                              ) : null}
                            </View>
                          </>
                        );
                      })}
                  </View>
                  <View flex style={styles.buttonContainer}>
                    <SubmitButton
                      title="Submit"
                      onPress={handleSubmit}
                      loading={loading}
                      bwidth={160}
                    />
                  </View>
                </>
              );
            }}
          </Formik>

          {/* <Text>{JSON.stringify(questionsDetails, null, 2)}</Text> */}
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

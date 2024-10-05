/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getStore } from "../graphql/queries";
import { updateStore } from "../graphql/mutations";
const client = generateClient();
export default function StoreUpdateForm(props) {
  const {
    id: idProp,
    store: storeModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    ProductName: "",
    ProductInfo: "",
    Rating: "",
    Image: "",
  };
  const [ProductName, setProductName] = React.useState(
    initialValues.ProductName
  );
  const [ProductInfo, setProductInfo] = React.useState(
    initialValues.ProductInfo
  );
  const [Rating, setRating] = React.useState(initialValues.Rating);
  const [Image, setImage] = React.useState(initialValues.Image);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = storeRecord
      ? { ...initialValues, ...storeRecord }
      : initialValues;
    setProductName(cleanValues.ProductName);
    setProductInfo(cleanValues.ProductInfo);
    setRating(cleanValues.Rating);
    setImage(cleanValues.Image);
    setErrors({});
  };
  const [storeRecord, setStoreRecord] = React.useState(storeModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getStore.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getStore
        : storeModelProp;
      setStoreRecord(record);
    };
    queryData();
  }, [idProp, storeModelProp]);
  React.useEffect(resetStateValues, [storeRecord]);
  const validations = {
    ProductName: [],
    ProductInfo: [],
    Rating: [{ type: "Required" }],
    Image: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          ProductName: ProductName ?? null,
          ProductInfo: ProductInfo ?? null,
          Rating,
          Image: Image ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateStore.replaceAll("__typename", ""),
            variables: {
              input: {
                id: storeRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "StoreUpdateForm")}
      {...rest}
    >
      <TextField
        label="Product name"
        isRequired={false}
        isReadOnly={false}
        value={ProductName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ProductName: value,
              ProductInfo,
              Rating,
              Image,
            };
            const result = onChange(modelFields);
            value = result?.ProductName ?? value;
          }
          if (errors.ProductName?.hasError) {
            runValidationTasks("ProductName", value);
          }
          setProductName(value);
        }}
        onBlur={() => runValidationTasks("ProductName", ProductName)}
        errorMessage={errors.ProductName?.errorMessage}
        hasError={errors.ProductName?.hasError}
        {...getOverrideProps(overrides, "ProductName")}
      ></TextField>
      <TextField
        label="Product info"
        isRequired={false}
        isReadOnly={false}
        value={ProductInfo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ProductName,
              ProductInfo: value,
              Rating,
              Image,
            };
            const result = onChange(modelFields);
            value = result?.ProductInfo ?? value;
          }
          if (errors.ProductInfo?.hasError) {
            runValidationTasks("ProductInfo", value);
          }
          setProductInfo(value);
        }}
        onBlur={() => runValidationTasks("ProductInfo", ProductInfo)}
        errorMessage={errors.ProductInfo?.errorMessage}
        hasError={errors.ProductInfo?.hasError}
        {...getOverrideProps(overrides, "ProductInfo")}
      ></TextField>
      <TextField
        label="Rating"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={Rating}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              ProductName,
              ProductInfo,
              Rating: value,
              Image,
            };
            const result = onChange(modelFields);
            value = result?.Rating ?? value;
          }
          if (errors.Rating?.hasError) {
            runValidationTasks("Rating", value);
          }
          setRating(value);
        }}
        onBlur={() => runValidationTasks("Rating", Rating)}
        errorMessage={errors.Rating?.errorMessage}
        hasError={errors.Rating?.hasError}
        {...getOverrideProps(overrides, "Rating")}
      ></TextField>
      <TextField
        label="Image"
        isRequired={false}
        isReadOnly={false}
        value={Image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ProductName,
              ProductInfo,
              Rating,
              Image: value,
            };
            const result = onChange(modelFields);
            value = result?.Image ?? value;
          }
          if (errors.Image?.hasError) {
            runValidationTasks("Image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("Image", Image)}
        errorMessage={errors.Image?.errorMessage}
        hasError={errors.Image?.hasError}
        {...getOverrideProps(overrides, "Image")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || storeModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || storeModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}

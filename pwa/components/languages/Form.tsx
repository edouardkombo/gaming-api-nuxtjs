import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { Languages } from "../../types/Languages";

interface Props {
  languages?: Languages;
}

export const Form: FunctionComponent<Props> = ({ languages }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(languages["@id"], { method: "DELETE" });
      router.push("/languages");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>
        {languages ? `Edit Languages ${languages["@id"]}` : `Create Languages`}
      </h1>
      <Formik
        initialValues={languages ? { ...languages } : new Languages()}
        validate={(values) => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          try {
            await fetch(isCreation ? "/languages" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            router.push("/languages");
          } catch (error) {
            setStatus({
              isValid: false,
              msg: `${error.defaultErrorMsg}`,
            });
            setErrors(error.fields);
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          status,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-control-label" htmlFor="_countryLanguage">
                countryLanguage
              </label>
              <input
                name="countryLanguage"
                id="_countryLanguage"
                value={values.countryLanguage ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.countryLanguage && touched.countryLanguage
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={errors.countryLanguage && touched.countryLanguage}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="countryLanguage"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_description">
                description
              </label>
              <input
                name="description"
                id="_description"
                value={values.description ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.description && touched.description ? " is-invalid" : ""
                }`}
                aria-invalid={errors.description && touched.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="description"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_sort">
                sort
              </label>
              <input
                name="sort"
                id="_sort"
                value={values.sort ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.sort && touched.sort ? " is-invalid" : ""
                }`}
                aria-invalid={errors.sort && touched.sort}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage className="text-danger" component="div" name="sort" />

            {status && status.msg && (
              <div
                className={`alert ${
                  status.isValid ? "alert-success" : "alert-danger"
                }`}
                role="alert"
              >
                {status.msg}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
      <Link href="/languages">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {languages && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};

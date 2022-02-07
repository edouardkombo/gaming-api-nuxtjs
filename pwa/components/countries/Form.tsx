import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { Countries } from "../../types/Countries";

interface Props {
  countries?: Countries;
}

export const Form: FunctionComponent<Props> = ({ countries }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(countries["@id"], { method: "DELETE" });
      router.push("/countries");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>
        {countries ? `Edit Countries ${countries["@id"]}` : `Create Countries`}
      </h1>
      <Formik
        initialValues={countries ? { ...countries } : new Countries()}
        validate={(values) => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          try {
            await fetch(isCreation ? "/countries" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            router.push("/countries");
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
              <label className="form-control-label" htmlFor="_country">
                country
              </label>
              <input
                name="country"
                id="_country"
                value={values.country ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.country && touched.country ? " is-invalid" : ""
                }`}
                aria-invalid={errors.country && touched.country}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="country"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_code">
                code
              </label>
              <input
                name="code"
                id="_code"
                value={values.code ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.code && touched.code ? " is-invalid" : ""
                }`}
                aria-invalid={errors.code && touched.code}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage className="text-danger" component="div" name="code" />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_jurisdiction">
                jurisdiction
              </label>
              <input
                name="jurisdiction"
                id="_jurisdiction"
                value={values.jurisdiction ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.jurisdiction && touched.jurisdiction
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={errors.jurisdiction && touched.jurisdiction}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="jurisdiction"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_id">
                id
              </label>
              <input
                name="id"
                id="_id"
                value={values.id ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.id && touched.id ? " is-invalid" : ""
                }`}
                aria-invalid={errors.id && touched.id}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage className="text-danger" component="div" name="id" />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_blockedGames">
                blockedGames
              </label>
              <input
                name="blockedGames"
                id="_blockedGames"
                value={values.blockedGames ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.blockedGames && touched.blockedGames
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={errors.blockedGames && touched.blockedGames}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="blockedGames"
            />

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
      <Link href="/countries">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {countries && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
